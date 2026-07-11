import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  // Sticky must live on the host: the inner <header> could only stick
  // within <app-header>, which is exactly as tall as the header itself.
  host: { class: 'sticky top-0 z-[100]' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/services', label: 'Services', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
