import { Component, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import {AuthService} from '../../../../../ez-client-ui-bck/src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const hasNumber = /[0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isLengthValid = value.length >= 8;
  
  const valid = hasNumber && hasUpper && hasLower && hasSpecial && isLengthValid;
  return valid ? null : { passwordStrength: true };
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) return null;
  
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

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
  tokenValidated = signal(false);
  userEmail = signal<string | null>(null);

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      name: [''],
    });
  }

  ngOnInit() {
    this.registrationToken = this.route.snapshot.queryParams['token'];
    if (this.registrationToken) {
      this.setMode('complete');
      this.validateToken();
    } else if (this.route.snapshot.url.some(segment => segment.path === 'complete-registration')) {
      this.router.navigate(['/']);
    }
  }

  async validateToken() {
    if (!this.registrationToken) return;
    
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const response = await this.auth.validateToken(this.registrationToken);
      this.tokenValidated.set(true);
      this.userEmail.set(response.email);
    } catch (err: any) {
      this.error.set(err.error?.message || 'Invalid or expired token');
      this.tokenValidated.set(false);
    } finally {
      this.loading.set(false);
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

    if (mode === 'login') {
      this.registrationToken = null;
      this.tokenValidated.set(false);
      this.userEmail.set(null);
      this.router.navigate([], { queryParams: {} });
    }

    // Clear form-level validators first
    this.form.clearValidators();

    if (mode === 'signup') {
      this.form.get('name')?.setValidators([Validators.required]);
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
      this.form.get('password')?.setValidators([Validators.required, passwordValidator]);
      this.form.get('confirmPassword')?.setValidators([Validators.required]);
      this.form.setValidators(passwordMatchValidator);
    } else if (mode === 'complete') {
      this.form.get('name')?.clearValidators();
      this.form.get('email')?.clearValidators();
      this.form.get('password')?.setValidators([Validators.required, passwordValidator]);
      this.form.get('confirmPassword')?.setValidators([Validators.required]);
      this.form.setValidators(passwordMatchValidator);
    } else if (mode === 'reset') {
      this.form.get('name')?.clearValidators();
      this.form.get('password')?.clearValidators();
      this.form.get('confirmPassword')?.clearValidators();
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
    } else { // login mode
      this.form.get('name')?.clearValidators();
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
      this.form.get('password')?.setValidators([Validators.required]);
      this.form.get('confirmPassword')?.clearValidators();
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
          if (!this.tokenValidated()) {
            this.error.set('Please validate your token first');
            return;
          }
          await this.auth.setPassword(this.registrationToken!, password);
          this.router.navigateByUrl('/login');
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
