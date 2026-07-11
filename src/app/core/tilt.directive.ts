import {
  Directive,
  DestroyRef,
  ElementRef,
  inject,
  input,
  afterNextRender,
} from '@angular/core';

/**
 * Adds 3D depth to cards on mouse-over: the element tilts toward the cursor
 * and lifts slightly. Only active on fine pointers with hover support, and
 * no-ops for reduced motion.
 */
@Directive({
  selector: '[tilt]',
})
export class TiltDirective {
  /** Maximum tilt in degrees. */
  readonly tiltMax = input(5);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (reduced || !canHover) {
        return;
      }

      let rect: DOMRect | null = null;
      let frame = 0;

      const onEnter = () => {
        // Measure before any transform is applied so tracking stays stable.
        rect = host.getBoundingClientRect();
        host.style.transition = 'transform 0.18s ease-out, box-shadow 0.3s ease';
        host.style.willChange = 'transform';
      };

      const onMove = (ev: PointerEvent) => {
        if (!rect) {
          return;
        }
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        const max = this.tiltMax();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          host.style.transform =
            `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) ` +
            `rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`;
        });
      };

      const onLeave = () => {
        rect = null;
        cancelAnimationFrame(frame);
        host.style.transition = 'transform 0.45s ease, box-shadow 0.3s ease';
        host.style.transform = '';
        host.style.willChange = '';
      };

      host.addEventListener('pointerenter', onEnter);
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      this.destroyRef.onDestroy(() => {
        host.removeEventListener('pointerenter', onEnter);
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        cancelAnimationFrame(frame);
      });
    });
  }
}
