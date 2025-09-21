import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../store/user.store';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;

  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  user: Partial<User> = { account_profile: {}, account_specialties: [], account_licenses: [] };
  isEditing = false;
  isSubmitting = false;

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.isEditing = true;
      this.user = this.route.snapshot.data['user'];
    }
  }

  updateProfile(field: string, value: any) {
    if (!this.user.account_profile) {
      this.user.account_profile = {};
    }
    (this.user.account_profile as any)[field] = value;
  }

  addLicense() {
    if (!this.user.account_licenses) this.user.account_licenses = [];
    this.user.account_licenses.push({
      license_type: '',
      license_number: '',
      expiry_date: '',
    });
  }

  removeLicense(index: number) {
    this.user.account_licenses?.splice(index, 1);
  }

  addSpecialty() {
    if (!this.user.account_specialties) this.user.account_specialties = [];
    this.user.account_specialties.push({
      specialty_name: '',
      skill_level: '',
      years_experience: 0,
    });
  }

  removeSpecialty(index: number) {
    this.user.account_specialties?.splice(index, 1);
  }

  onSubmit() {
    if (!this.userForm.valid) return;

    this.isSubmitting = true;
    const action = this.isEditing
      ? this.userService.updateUser(this.user)
      : this.userService.createUser(this.user);

    action.subscribe({
      next: () => {
        this.router.navigate(['/workspace/users']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error saving user:', error);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/workspace/users']);
  }
}
