import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../core/reveal.directive';
import { ScrollZoomDirective } from '../../core/scroll-zoom.directive';
import { SERVICES } from '../../core/data';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RevealDirective, ScrollZoomDirective],
  templateUrl: './services.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly services = SERVICES;
}
