import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStore, User } from '../../store/user.store';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  isEditing = true;
  profileImage: string | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  prefixOptions = [null, 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];
  suffixOptions = [null, 'Jr.', 'Sr.', 'II', 'III', 'IV', 'PhD', 'MD', 'Esq.'];

  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prefix: [''],
      suffix: ['']
    });
  }

  ngOnInit() {
    this.user = this.userStore.user();
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfileImage() {
    if (this.user?.avatar_url) {
      this.isLoading = true;
      this.profileService.deleteProfileImage().subscribe({
        next: () => {
          this.profileImage = null;
          this.selectedFile = null;
          this.updateUserInStore({ ...this.user!, avatar_url: null });
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.profileImage = null;
      this.selectedFile = null;
    }
  }

  onSave() {
    if (this.profileForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      // First upload image if selected
      if (this.selectedFile) {
        this.profileService.uploadProfileImage(this.selectedFile).subscribe({
          next: (response) => {
            this.saveProfile({ ...this.profileForm.value, image_url: response.image_url });
          },
          error: () => {
            this.isLoading = false;
          }
        });
      } else {
        this.saveProfile(this.profileForm.value);
      }
    }
  }

  private saveProfile(profileData: Partial<User>) {
    this.profileService.updateProfile(profileData).subscribe({
      next: (updatedUser) => {
        this.updateUserInStore(updatedUser);
        this.selectedFile = null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private updateUserInStore(updatedUser: User) {
    this.userStore.setUser(updatedUser);
    this.user = updatedUser;
    this.profileForm.patchValue(updatedUser);
  }

  getInitials(): string {
    if (!this.user) return 'U';
    return (this.user.first_name[0] + this.user.last_name[0]).toUpperCase();
  }
}