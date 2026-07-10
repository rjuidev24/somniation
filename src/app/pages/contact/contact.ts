import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONTACT_INFO, FAQS, SERVICES } from '../../core/data';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  protected readonly services = SERVICES;
  protected readonly contact = CONTACT_INFO;
  protected readonly faqs = FAQS;

  protected readonly submitted = signal(false);
  protected readonly sent = signal(false);
  protected readonly openFaq = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      return;
    }
    // There is no backend yet: acknowledge the message locally.
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.submitted.set(false);
    this.sent.set(false);
  }

  protected toggleFaq(index: number): void {
    this.openFaq.update((open) => (open === index ? null : index));
  }

  protected invalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted());
  }
}
