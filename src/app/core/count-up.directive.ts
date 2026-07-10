import {
  Directive,
  ElementRef,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Animates the host element's text from 0 to `countUp` when it scrolls into
 * view. No-ops during prerendering (afterNextRender only runs in the browser)
 * and when the user prefers reduced motion.
 */
@Directive({
  selector: '[countUp]',
})
export class CountUpDirective {
  readonly countUp = input.required<number>();
  readonly decimals = input(0);
  readonly suffix = input('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || typeof IntersectionObserver === 'undefined') {
        this.render(this.countUp());
        return;
      }

      this.render(0);
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            this.animate();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(this.el.nativeElement);
    });
  }

  private animate(): void {
    const target = this.countUp();
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.render(target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  private render(value: number): void {
    this.el.nativeElement.textContent =
      value.toFixed(this.decimals()) + this.suffix();
  }
}
