import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpDirective } from '../../core/count-up.directive';
import {
  PROCESS,
  SERVICES,
  STATS,
  TECH_PARTNERS,
  TESTIMONIALS,
} from '../../core/data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CountUpDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly services = SERVICES;
  protected readonly stats = STATS;
  protected readonly process = PROCESS;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly partners = TECH_PARTNERS;

  protected readonly differentiators = [
    {
      icon: 'zap',
      title: 'Fast, human response',
      text: 'A 15-minute SLA on critical issues and a helpdesk staffed by engineers, not script readers.',
    },
    {
      icon: 'award',
      title: 'Certified senior experts',
      text: 'ISO 27001-certified operations and engineers who hold AWS, Azure, Cisco and CISSP credentials.',
    },
    {
      icon: 'trending-up',
      title: 'Built to scale with you',
      text: 'Plans priced per seat and per service, so your IT grows with your headcount — not ahead of it.',
    },
    {
      icon: 'layers',
      title: 'One partner, full stack',
      text: 'Helpdesk, cloud, security, software and data under one roof, with one roadmap and one number to call.',
    },
  ];
}
