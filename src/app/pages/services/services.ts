import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/data';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services = SERVICES;
}
