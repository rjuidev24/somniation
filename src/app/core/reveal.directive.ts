import {
  Directive,
  DestroyRef,
  ElementRef,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Fades and slides the host element up when it scrolls into view.
 * The hidden state is only applied in the browser, so prerendered HTML
 * stays fully visible without JavaScript. No-ops for reduced motion.
 */
@Directive({
  selector: '[reveal]',
})
export class RevealDirective {
  /** Extra delay in ms, for staggering items in a grid. */
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || typeof IntersectionObserver === 'undefined') {
        return;
      }

      host.classList.add('reveal-pending');
      const delay = this.revealDelay();
      if (delay > 0) {
        host.style.transitionDelay = `${delay}ms`;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            host.classList.add('reveal-in');
            // Clean up once the entrance finishes so the inline delay and
            // reveal transition never interfere with hover transitions.
            window.setTimeout(() => {
              host.classList.remove('reveal-pending', 'reveal-in');
              host.style.transitionDelay = '';
            }, delay + 850);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(host);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
