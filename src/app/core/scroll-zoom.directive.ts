import {
  Directive,
  DestroyRef,
  ElementRef,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Gradually zooms the host image as it travels up through the viewport,
 * making it "pop" while scrolling. Apply to an <img> inside an
 * `overflow-hidden` frame (the parent is measured, so the scale transform
 * never feeds back into the math). No-ops for reduced motion.
 */
@Directive({
  selector: '[scrollZoom]',
})
export class ScrollZoomDirective {
  readonly zoomFrom = input(1);
  readonly zoomTo = input(1.16);

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
        if (rect.bottom < 0 || rect.top > vh) {
          return;
        }
        // 0 as the frame enters from the bottom, 1 as it leaves at the top.
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        const scale = this.zoomFrom() + (this.zoomTo() - this.zoomFrom()) * progress;
        host.style.transform = `scale(${scale.toFixed(3)})`;
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
