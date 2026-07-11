import {
  Directive,
  DestroyRef,
  ElementRef,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Moves the host element vertically as the page scrolls, proportional to how
 * far its parent is from the viewport center. Apply to an oversized media
 * layer inside an `overflow-hidden` container (the parent is measured so the
 * transform never feeds back into the math). No-ops for reduced motion.
 */
@Directive({
  selector: '[parallax]',
})
export class ParallaxDirective {
  /** Positive values scroll slower than the page; try 0.1–0.25. */
  readonly parallaxSpeed = input(0.16);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        return;
      }

      const anchor = host.parentElement ?? host;
      host.style.willChange = 'transform';
      let ticking = false;

      const update = () => {
        ticking = false;
        const rect = anchor.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < -100 || rect.top > vh + 100) {
          return;
        }
        const offset = (rect.top + rect.height / 2 - vh / 2) * this.parallaxSpeed();
        host.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
