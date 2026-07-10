import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO, SERVICES } from '../../core/data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly services = SERVICES;
  protected readonly contact = CONTACT_INFO;
  protected readonly year = new Date().getFullYear();
}
