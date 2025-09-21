import { Component, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import {AuthService} from '../../../../../ez-client-ui-bck/src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mode = signal<'login' | 'signup' | 'reset' | 'complete'>('login');
  form: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  registrationToken: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
    });
  }

  ngOnInit() {
    this.registrationToken = this.route.snapshot.queryParams['token'];
    if (this.registrationToken) {
      this.setMode('complete');
    } else if (this.route.snapshot.url.some(segment => segment.path === 'complete-registration')) {
      this.router.navigate(['/']);
    }
  }

  get isLogin() {
    return this.mode() === 'login';
  }

  get isSignup() {
    return this.mode() === 'signup';
  }

  get isReset() {
    return this.mode() === 'reset';
  }

  get isComplete() {
    return this.mode() === 'complete';
  }

  setMode(mode: 'login' | 'signup' | 'reset' | 'complete') {
    this.mode.set(mode);
    this.error.set(null);
    this.form.reset();

    if (mode === 'signup') {
      this.form.get('name')?.setValidators([Validators.required]);
    } else {
      this.form.get('name')?.clearValidators();
    }

    if (mode === 'reset') {
      this.form.get('password')?.clearValidators();
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
    } else if (mode === 'complete') {
      this.form.get('email')?.clearValidators();
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }

    this.form.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, password, name } = this.form.value;
      const mode = this.mode();

      const actions = {
        login: async () => {
          await this.auth.login(email, password);
          await this.auth.boot();
          this.router.navigateByUrl('/workspace');
        },
        signup: async () => {
          await this.auth.signup(email, password, name);
          await this.auth.boot();
          this.router.navigateByUrl('/');
        },
        reset: async () => {
          await this.auth.resetPassword(email);
          this.setMode('login');
        },
        complete: async () => {
          await this.auth.completeRegistration(this.registrationToken!, password);
          await this.auth.boot();
          this.router.navigateByUrl('/workspace');
        },
      };

      await actions[mode]();
      // await actions[mode]();
    } catch (err: any) {
      this.error.set(err.error?.message || 'An error occurred');
    } finally {
      this.loading.set(false);
    }
  }
}
