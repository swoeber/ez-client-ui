import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, TitleCasePipe, AsyncPipe, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { User } from '../../../store/user.store';
import { Role } from '../../../interfaces/roles.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe, AsyncPipe],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;

  userService = inject(UserService);
  roleService = inject(RoleService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  user: Partial<User> = {
    account_profile: {},
    account_specialties: [],
    account_licenses: [],
    account_roles: [],
  };
  availableRoles$: Observable<Role[]> = new Observable<Role[]>();
  isEditing = false;
  isSubmitting = false;

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.isEditing = true;
      this.user = this.route.snapshot.data['user'];
    }
    this.availableRoles$ = this.roleService.getRoles();
  }

  toggleRole(role: Role): void {
    if (!this.user.account_roles) this.user.account_roles = [];

    const roleIndex = this.user.account_roles.findIndex((r) => r.id === role.id);
    if (roleIndex > -1) {
      this.user.account_roles.splice(roleIndex, 1);
    } else {
      this.user.account_roles.push(role);
    }
  }

  hasRole(role: Role): boolean {
    return this.user.account_roles?.some((r) => r.id === role.id) || false;
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
    // this.router.navigate(['/workspace/users']);
    this.location.back();
  }
}
