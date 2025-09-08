/*
 * ezClientPro Marketing Page – Angular Standalone Component (Light Theme)
 * ----------------------------------------------------------------------
 * Notes:
 * - Uses Bootstrap Icons for visuals. Add this to your index.html head:
 *     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
 * - Pure HTML/CSS; no external UI frameworks required beyond icons.
 * - Theme colors are defined as CSS variables below. Replace the placeholder
 *   values with your actual brand palette from the web‑app design.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ezclientpro-marketing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <!-- Header / Nav -->
      <header class="nav" role="navigation" aria-label="Primary">
        <a class="brand" routerLink="/">
          <img src="logos/ez-client-logo.png" alt="ezClientPro logo" class="logo" />
          <!-- <span>ezClientPro</span> -->
        </a>
        <nav class="links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div class="cta-group">
          <a routerLink="/login" class="btn btn-ghost">Sign in</a>
          <a routerLink="/signup" class="btn btn-primary">Start free</a>
        </div>
      </header>

      <!-- Hero -->
      <section class="hero" id="home">
        <div class="hero-content">
          <h1>Client work, <span class="accent">simplified</span>.</h1>
          <p class="tagline">
            ezClientPro is the all‑in‑one workspace to book jobs, track work, send invoices, and get
            paid—without the busywork.
          </p>
          <div class="actions">
            <a routerLink="/signup" class="btn btn-primary btn-lg">Create your free account</a>
            <a href="#features" class="btn btn-ghost btn-lg">See features</a>
          </div>
          <div class="trust">
            <i class="bi bi-shield-check" aria-hidden="true"></i>
            <span class="trust-text">Secure, reliable, and built for teams</span>
          </div>
        </div>
        <div class="hero-media" role="img" aria-label="Product screenshot">
          <img src="marketing/dashboard.png" alt="ezClientPro dashboard screenshot" />
        </div>
      </section>

      <!-- Social proof -->
      <section class="social-proof">
        <ul>
          <li>
            <strong>12,000+</strong>
            <span>projects scheduled</span>
          </li>
          <li>
            <strong>2M+</strong>
            <span>invoices sent</span>
          </li>
          <li>
            <strong>99.95%</strong>
            <span>uptime</span>
          </li>
        </ul>
      </section>

      <!-- Features -->
      <section class="section" id="features">
        <div class="section-head">
          <h2>Everything you need to run client work</h2>
          <p>
            No spreadsheets. No tab‑hopping. Just a clean flow from request → job → invoice →
            payment.
          </p>
        </div>
        <div class="grid features">
          <article class="card">
            <div class="icon"><i class="bi bi-calendar3" aria-hidden="true"></i></div>
            <h3>Smart scheduling</h3>
            <p>
              Drag‑and‑drop calendar, route clustering, and availability windows so you never double
              book.
            </p>
            <ul>
              <li>Calendar & list views</li>
              <li>Google Calendar sync</li>
              <li>Automated reminders</li>
            </ul>
          </article>
          <article class="card">
            <div class="icon"><i class="bi bi-wrench-adjustable" aria-hidden="true"></i></div>
            <h3>Field job checklists</h3>
            <p>
              Guided steps, photo check‑offs, and parts used—perfect for HVAC, IT on‑site, and home
              services.
            </p>
            <ul>
              <li>Custom templates</li>
              <li>Offline mode</li>
              <li>Before/after photos</li>
            </ul>
          </article>
          <article class="card">
            <div class="icon"><i class="bi bi-credit-card" aria-hidden="true"></i></div>
            <h3>Invoices that get paid</h3>
            <p>
              Send branded invoices with card, ACH, or tap‑to‑pay. Auto‑apply deposits and late
              fees.
            </p>
            <ul>
              <li>Stripe Payments</li>
              <li>Partial & milestone billing</li>
              <li>Recurring invoices</li>
            </ul>
          </article>
          <article class="card">
            <div class="icon"><i class="bi bi-graph-up" aria-hidden="true"></i></div>
            <h3>Real‑time insights</h3>
            <p>
              Know what’s scheduled, owed, and overdue—with simple reports you can export in one
              click.
            </p>
            <ul>
              <li>Job & revenue dashboards</li>
              <li>Aging & collections</li>
              <li>CSV / QuickBooks export</li>
            </ul>
          </article>
          <article class="card">
            <div class="icon"><i class="bi bi-people" aria-hidden="true"></i></div>
            <h3>Clients & approvals</h3>
            <p>
              Share proposals, get signatures, and keep all messages, photos, and files in one
              thread.
            </p>
            <ul>
              <li>E‑signature</li>
              <li>Client portal</li>
              <li>File attachments</li>
            </ul>
          </article>
          <article class="card">
            <div class="icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></div>
            <h3>Security built‑in</h3>
            <p>
              Role‑based access, audit logs, and encryption at rest & in transit. Your data stays
              yours.
            </p>
            <ul>
              <li>SSO & 2FA</li>
              <li>Audit trails</li>
              <li>Data export anytime</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- How it works -->
      <section class="section alt" id="how-it-works">
        <div class="section-head">
          <h2>From request to payment in four steps</h2>
        </div>
        <ol class="how">
          <li>
            <span class="step">1</span>
            <h3>Capture the request</h3>
            <p>Embed a lead form or book from your calendar. Auto‑route jobs to the right tech.</p>
          </li>
          <li>
            <span class="step">2</span>
            <h3>Do the work</h3>
            <p>Follow a checklist, track parts & time, and attach photos—even offline.</p>
          </li>
          <li>
            <span class="step">3</span>
            <h3>Send the invoice</h3>
            <p>
              Bill by flat rate, time & materials, or milestones. One click from job to invoice.
            </p>
          </li>
          <li>
            <span class="step">4</span>
            <h3>Get paid</h3>
            <p>Offer card or ACH. Send automatic reminders until it’s paid. Cash flow, fixed.</p>
          </li>
        </ol>
        <div class="actions center">
          <a routerLink="/signup" class="btn btn-primary btn-lg">Try it free</a>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section" id="testimonials">
        <div class="section-head">
          <h2>Loved by solo pros & service teams</h2>
        </div>
        <div class="grid testimonials">
          <figure class="quote">
            <blockquote>
              “We replaced three tools with ezClientPro. Scheduling is easy and invoices get paid
              faster.”
            </blockquote>
            <figcaption>
              <img src="assets/avatars/ava-1.jpg" alt="Photo" />
              <div>
                <strong>Maria G.</strong>
                <span>Owner, Bright Air & Heat</span>
              </div>
            </figcaption>
          </figure>
          <figure class="quote">
            <blockquote>
              “My field techs live by the checklists. Photos and notes flow right into the invoice.”
            </blockquote>
            <figcaption>
              <img src="assets/avatars/ava-2.jpg" alt="Photo" />
              <div>
                <strong>DeShawn P.</strong>
                <span>IT Services Manager</span>
              </div>
            </figcaption>
          </figure>
          <figure class="quote">
            <blockquote>
              “First month we saved 8+ hours on admin and collected two past‑due invoices
              automatically.”
            </blockquote>
            <figcaption>
              <img src="assets/avatars/ava-3.jpg" alt="Photo" />
              <div>
                <strong>Alex N.</strong>
                <span>Freelance Technician</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- Pricing -->
      <section class="section alt" id="pricing">
        <div class="section-head">
          <h2>Simple, transparent pricing</h2>
          <p>Start free. Upgrade anytime. No contracts.</p>
        </div>
        <div class="grid pricing">
          <div class="tier">
            <div class="tier-head">
              <h3>Starter</h3>
              <div class="price">
                <span class="amount">$0</span>
                <span class="term">/month</span>
              </div>
              <p class="blurb">For solo pros testing the waters.</p>
            </div>
            <ul class="features-list">
              <li>Up to 3 active jobs</li>
              <li>Unlimited invoices</li>
              <li>Stripe payments</li>
              <li>Email support</li>
            </ul>
            <a routerLink="/signup" class="btn btn-ghost full">Get started</a>
          </div>

          <div class="tier highlight" aria-label="Most popular plan">
            <div class="badge">Most Popular</div>
            <div class="tier-head">
              <h3>Pro</h3>
              <div class="price">
                <span class="amount">$15</span>
                <span class="term">/month</span>
              </div>
              <p class="blurb">For growing teams that need automation.</p>
            </div>
            <ul class="features-list">
              <li>Unlimited jobs & clients</li>
              <li>Checklists & photo logs</li>
              <li>Recurring invoices</li>
              <li>Email + chat support</li>
            </ul>
            <a routerLink="/signup" class="btn btn-primary full">Get startedl</a>
          </div>

          <div class="tier">
            <div class="tier-head">
              <h3>Business</h3>
              <div class="price">
                <span class="amount">$29</span>
                <span class="term">/month</span>
              </div>
              <p class="blurb">For teams that need SSO, roles, and exports.</p>
            </div>
            <ul class="features-list">
              <li>All Pro features</li>
              <li>Roles & permissions</li>
              <li>Audit logs & exports</li>
              <li>Priority support</li>
            </ul>
            <a routerLink="/contact" class="btn btn-ghost full">Talk to sales</a>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section" id="faq">
        <div class="section-head">
          <h2>Frequently asked questions</h2>
        </div>
        <details>
          <summary>Can I import my clients and jobs?</summary>
          <p>
            Yes. Import CSVs for clients, price books, and active jobs. Our team can help for free
            during trial.
          </p>
        </details>
        <details>
          <summary>How do payments work?</summary>
          <p>
            Connect your Stripe account to accept card and ACH. Funds settle directly to your
            bank—no middlemen.
          </p>
        </details>
        <details>
          <summary>Do you have a mobile app?</summary>
          <p>
            The web app is fully responsive and works offline for field checklists. Native apps are
            on our roadmap.
          </p>
        </details>
        <details>
          <summary>Can I cancel anytime?</summary>
          <p>Absolutely. There are no long‑term contracts. Export your data at any time.</p>
        </details>
      </section>

      <!-- CTA -->
      <section class="cta">
        <h2>Run your client work on ezClientPro</h2>
        <p>Try it free—no credit card required.</p>
        <div class="actions">
          <a routerLink="/signup" class="btn btn-primary btn-lg">Start free</a>
          <a routerLink="/demo" class="btn btn-ghost btn-lg">Watch a 3‑min demo</a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="col">
          <a class="brand small" routerLink="/">
            <img src="logos/ez-client-logo.png" alt="ezClientPro logo" class="logo" />
            <span>ezClientPro</span>
          </a>
          <p class="muted">© {{ year }} ezClientPro. All rights reserved.</p>
        </div>
        <div class="col">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a routerLink="/changelog">Changelog</a>
        </div>
        <div class="col">
          <h4>Company</h4>
          <a routerLink="/about">About</a>
          <a routerLink="/careers">Careers</a>
          <a routerLink="/contact">Contact</a>
        </div>
        <div class="col">
          <h4>Resources</h4>
          <a routerLink="/docs">Docs</a>
          <a routerLink="/privacy">Privacy</a>
          <a routerLink="/terms">Terms</a>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      /* Light Theme Variables – Replace with your app's palette */
      :host {
        --bg: #ffffff;
        --surface: #f7f9fc; /* section alt background */
        --card: #ffffff; /* cards, panels */
        --ink: #0f172a; /* text */
        --ink-2: #334155; /* secondary text */
        --muted: #64748b; /* subtle text */
        --border: #e5e7eb; /* light borders */
        --shadow: 0 8px 24px rgba(2, 6, 23, 0.08);

        // /* BRAND – swap these with your design tokens */
        // --brand-primary: #0d6efd; /* TODO: replace with app Primary */
        // --brand-secondary: #6c757d; /* TODO: replace with app Secondary */
        // --brand-accent: #22d3ee; /* TODO: replace with app Accent */

        /* Derived */
        --btn-primary-fg: #ffffff;
        --ring: rgba(13, 110, 253, 0.25);
      }

      * {
        box-sizing: border-box;
      }
      .page {
        color: var(--ink);
        background: var(--bg);
        min-height: 100svh;
      }

      /* Nav */
      .nav {
        position: sticky;
        top: 0;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem 2rem;
        background: #ffffffcc;
        backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border);
        box-shadow: 0 2px 10px rgba(2, 6, 23, 0.04);
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.2px;
        text-decoration: none;
        color: var(--ink);
      }
      .brand .logo {
        // width: 28px;
        height: 28px;
      }
      .links a {
        color: var(--ink-2);
        text-decoration: none;
        margin: 0 0.8rem;
        font-weight: 500;
      }
      .links a:hover {
        color: var(--ink);
      }
      .cta-group {
        display: flex;
        gap: 0.6rem;
        justify-self: end;
      }

      /* Buttons */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.6rem 1rem;
        border-radius: 12px;
        border: 1px solid var(--border);
        text-decoration: none;
        font-weight: 600;
        color: var(--ink);
        transition: transform 0.05s ease, background 0.2s ease, box-shadow 0.2s ease;
      }
      .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
      }
      .btn:active {
        transform: translateY(0);
      }
      .btn-ghost {
        background: #fff;
        color: var(--ink-2);
      }
      .btn-ghost:hover {
        background: #f8fafc;
        color: var(--ink);
      }
      .btn-primary {
        background: var(--brand-primary);
        color: var(--btn-primary-fg);
        border-color: var(--brand-primary);
      }
      .btn-primary:hover {
        filter: brightness(1.05);
        box-shadow: 0 10px 22px var(--ring);
      }
      .btn-lg {
        padding: 0.9rem 1.2rem;
        border-radius: 14px;
      }
      .full {
        width: 100%;
      }

      /* Hero */
      .hero {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        align-items: center;
        gap: 2.5rem;
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .hero-content h1 {
        font-size: clamp(2.4rem, 4vw, 3.4rem);
        line-height: 1.05;
        margin: 0 0 1rem;
        letter-spacing: 0.2px;
      }
      .accent {
        color: var(--brand-primary);
      }
      .tagline {
        font-size: 1.1rem;
        color: var(--ink-2);
        max-width: 60ch;
      }
      .actions {
        display: flex;
        gap: 0.8rem;
        margin-top: 1.2rem;
        flex-wrap: wrap;
      }
      .trust {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
        margin-top: 1.4rem;
        color: var(--muted);
      }
      .trust .bi {
        font-size: 1.1rem;
        color: var(--brand-primary);
      }
      .hero-media {
        border-radius: 16px;
        background: #fff;
        border: 1px solid var(--border);
        padding: 0.8rem;
        box-shadow: var(--shadow);
      }
      .hero-media img {
        width: 100%;
        border-radius: 10px;
        display: block;
      }

      /* Social proof */
      .social-proof {
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        padding: 1rem;
        background: #ffffff;
      }
      .social-proof ul {
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        list-style: none;
        padding: 0;
      }
      .social-proof li {
        text-align: center;
        color: var(--ink-2);
      }
      .social-proof strong {
        display: block;
        font-size: 1.2rem;
        color: var(--ink);
      }

      /* Sections */
      .section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
        background: #fff;
      }
      .section.alt {
        background: var(--surface);
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }
      .section-head {
        text-align: center;
        margin-bottom: 2rem;
      }
      .section-head h2 {
        font-size: clamp(1.6rem, 2.6vw, 2.2rem);
        margin: 0 0 0.6rem;
      }
      .section-head p {
        color: var(--ink-2);
        margin: 0 auto;
        max-width: 70ch;
      }

      /* Grid */
      .grid {
        display: grid;
        gap: 1.2rem;
      }
      .features {
        grid-template-columns: repeat(3, 1fr);
      }
      .testimonials {
        grid-template-columns: repeat(3, 1fr);
      }
      .pricing {
        grid-template-columns: repeat(3, 1fr);
        align-items: stretch;
      }

      /* Cards */
      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 1.2rem;
        box-shadow: var(--shadow);
      }
      .card .icon {
        font-size: 1.3rem;
        display: inline-flex;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #f1f5f9;
        border: 1px solid var(--border);
        margin-bottom: 0.6rem;
        color: var(--brand-primary);
      }

      /* How it works */
      .how {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        list-style: none;
        padding: 0;
        counter-reset: steps;
      }
      .how li {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 1rem;
        box-shadow: var(--shadow);
      }
      .how .step {
        display: inline-flex;
        width: 32px;
        height: 32px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--brand-primary);
        color: #fff;
        font-weight: 800;
        margin-bottom: 0.5rem;
      }

      /* Quotes */
      .quote {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 1rem;
        display: grid;
        gap: 0.8rem;
        box-shadow: var(--shadow);
      }
      blockquote {
        margin: 0;
        color: var(--ink);
        font-size: 1rem;
        line-height: 1.5;
      }
      .quote figcaption {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }
      .quote img {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid var(--border);
      }
      .quote strong {
        display: block;
      }
      .quote span {
        color: var(--muted);
        font-size: 0.9rem;
      }

      /* Pricing */
      .tier {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 1.2rem;
        position: relative;
        display: grid;
        gap: 1rem;
        box-shadow: var(--shadow);
      }
      .tier .badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #f1f5f9;
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 0.2rem 0.6rem;
        font-size: 0.75rem;
        color: var(--ink-2);
      }
      .tier.highlight {
        outline: 2px solid color-mix(in srgb, var(--brand-primary) 35%, transparent);
        box-shadow: 0 16px 40px rgba(13, 110, 253, 0.1);
      }
      .tier-head h3 {
        margin: 0 0 0.4rem;
        font-size: 1.2rem;
      }
      .price {
        display: flex;
        align-items: baseline;
        gap: 0.3rem;
      }
      .amount {
        font-size: 2rem;
        font-weight: 800;
      }
      .term {
        color: var(--muted);
      }
      .blurb {
        margin: 0;
        color: var(--ink-2);
      }
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.4rem;
      }
      .features-list li {
        position: relative;
        padding-left: 1.2rem;
      }
      .features-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 0;
        color: var(--brand-primary);
      }

      /* FAQ */
      details {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 0.9rem 1rem;
        margin-bottom: 0.8rem;
        box-shadow: var(--shadow);
      }
      summary {
        cursor: pointer;
        font-weight: 600;
      }

      /* CTA */
      .cta {
        text-align: center;
        padding: 4rem 2rem;
        background: linear-gradient(180deg, var(--surface), #fff);
        border-top: 1px solid var(--border);
      }
      .cta h2 {
        margin: 0 0 0.6rem;
        font-size: clamp(1.6rem, 3vw, 2.2rem);
      }
      .cta p {
        color: var(--ink-2);
        margin: 0 0 1rem;
      }
      .center {
        justify-content: center;
      }

      /* Footer */
      .footer {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.2rem;
        padding: 2rem;
        border-top: 1px solid var(--border);
        background: #fff;
      }
      .footer .col {
        display: grid;
        gap: 0.4rem;
        align-content: start;
      }
      .footer a {
        color: var(--ink-2);
        text-decoration: none;
      }
      .footer a:hover {
        color: var(--ink);
      }
      .brand.small span {
        font-size: 1rem;
      }
      .muted {
        color: var(--muted);
      }

      /* Responsive */
      @media (max-width: 980px) {
        .hero {
          grid-template-columns: 1fr;
          padding-top: 2.5rem;
        }
        .links {
          display: none;
        }
        .social-proof ul {
          grid-template-columns: 1fr;
          gap: 0.2rem;
        }
        .features,
        .testimonials,
        .pricing {
          grid-template-columns: repeat(2, 1fr);
        }
        .how {
          grid-template-columns: repeat(2, 1fr);
        }
        .footer {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 640px) {
        .features,
        .testimonials,
        .pricing {
          grid-template-columns: 1fr;
        }
        .how {
          grid-template-columns: 1fr;
        }
        .nav {
          grid-template-columns: 1fr auto;
        }
        .cta-group {
          justify-self: end;
        }
        .footer {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class EzClientProMarketingComponent {
  year = new Date().getFullYear();
}
