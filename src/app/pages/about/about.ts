import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MILESTONES, TEAM, VALUES } from '../../core/data';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
})
export class About {
  protected readonly values = VALUES;
  protected readonly team = TEAM;
  protected readonly milestones = MILESTONES;

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }
}
