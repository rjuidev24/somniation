import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/data';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
})
export class Services {
  protected readonly services = SERVICES;
}
