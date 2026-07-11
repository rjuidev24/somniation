import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';
import { RevealDirective } from '../../core/reveal.directive';
import { TiltDirective } from '../../core/tilt.directive';
import { CONTACT_INFO, FAQS, SERVICES } from '../../core/data';

const EMPTY_MODEL = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

@Component({
  selector: 'app-contact',
  imports: [FormField, RevealDirective, TiltDirective],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly services = SERVICES;
  protected readonly contact = CONTACT_INFO;
  protected readonly faqs = FAQS;

  protected readonly sent = signal(false);
  protected readonly openFaq = signal<number | null>(null);

  protected readonly model = signal({ ...EMPTY_MODEL });

  protected readonly form = form(this.model, (s) => {
    required(s.name, { message: 'Please enter your name.' });
    minLength(s.name, 2, { message: 'Please enter your name.' });
    required(s.email, { message: 'Please enter a valid email address.' });
    email(s.email, { message: 'Please enter a valid email address.' });
    required(s.message, {
      message: 'Please tell us a bit more (at least 20 characters).',
    });
    minLength(s.message, 20, {
      message: 'Please tell us a bit more (at least 20 characters).',
    });
  });

  protected onSubmit(): void {
    // submit() marks every field as touched and only runs the
    // action when the form is valid.
    submit(this.form, async () => {
      // There is no backend yet: acknowledge the message locally.
      this.sent.set(true);
    });
  }

  protected reset(): void {
    this.model.set({ ...EMPTY_MODEL });
    this.form().reset();
    this.sent.set(false);
  }

  protected toggleFaq(index: number): void {
    this.openFaq.update((open) => (open === index ? null : index));
  }
}
