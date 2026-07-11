import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../core/parallax.directive';
import { RevealDirective } from '../../core/reveal.directive';
import { ScrollZoomDirective } from '../../core/scroll-zoom.directive';
import { TiltDirective } from '../../core/tilt.directive';
import { MILESTONES, TEAM, VALUES } from '../../core/data';

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    ParallaxDirective,
    RevealDirective,
    ScrollZoomDirective,
    TiltDirective,
  ],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly values = VALUES;
  protected readonly milestones = MILESTONES;
  protected readonly team = TEAM.map((member) => ({
    ...member,
    initials: initials(member.name),
  }));
}
