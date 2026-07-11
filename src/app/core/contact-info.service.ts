import { Injectable, afterNextRender, signal } from '@angular/core';

export interface ContactInfo {
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  hours: string;
}

/**
 * Contact details are stored reversed and base64-encoded, and only decoded
 * in the browser after hydration. They therefore never appear in prerendered
 * HTML, in the SSR response, or as readable strings in the JS bundle — which
 * keeps them away from crawlers and address/phone harvesters while staying
 * visible to human visitors. Templates should also mark the containers with
 * `data-nosnippet` so search engines that do execute JS won't quote them.
 *
 * Trade-off: visitors with JavaScript disabled won't see the details.
 */
@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  /** `null` during prerender/SSR and until hydration completes. */
  readonly info = signal<ContactInfo | null>(null);

  constructor() {
    // Runs only in the browser, after hydration — so the server-rendered
    // DOM (without the details) never mismatches the client render.
    afterNextRender(() => {
      this.info.set({
        address: decode('MjcwNTcgWFQgLHllbm5pS2NNICxyRCBhaXJiYXRpQyA1MDU0'),
        phone: decode('MDYwMC04MzcgKTIwNCggMSs='),
        phoneHref: decode('MDYwMDgzNzIwNDErOmxldA=='),
        email: decode('bW9jLm5vaXRhaW5tb3NAbmltZGE='),
        emailHref: decode('bW9jLm5vaXRhaW5tb3NAbmltZGE6b3RsaWFt'),
        hours: 'Mon–Fri, 7:00am – 7:00pm CT · 24/7 for critical incidents',
      });
    });
  }
}

function decode(value: string): string {
  return [...atob(value)].reverse().join('');
}
