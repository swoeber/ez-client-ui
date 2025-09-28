import { Component, OnInit, inject, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserStore } from '../../store/user.store';
import { ProjectService, Project } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Perm } from '../../enum/permissions.model';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/roles.interface';
import { Permission } from '../../interfaces/permission.interface';

interface RoleWithPermissions extends Role {
  permissions: Permission[];
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  @Input() userId!: number;

  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roleService = inject(RoleService);
  private userStore = inject(UserStore);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  projects: Project[] = [];
  clientRatingAverage: number | null = null;
  userRoles: RoleWithPermissions[] = [];
  availableRoles: Role[] = [];
  selectedRoleId: number | null = null;

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.loadProjects();
    this.loadUserRoles();
    this.loadAvailableRoles();
  }

  private loadAvailableRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => (this.availableRoles = roles),
      error: (error) => console.error('Error loading roles:', error),
    });
  }

  canManageRoles(): boolean {
    return this.userStore.hasRole('admin') || this.userStore.has('write_users');
  }

  assignRole(): void {
    if (!this.selectedRoleId || !this.user) return;

    const selectedRole = this.availableRoles.find((r) => r.id === this.selectedRoleId);
    if (!selectedRole) return;

    // Check if user already has this role
    if (this.userRoles.some((r) => r.id === selectedRole.id)) {
      this.selectedRoleId = null;
      return;
    }

    // Convert Role to RoleWithPermissions (would normally fetch permissions from API)
    const roleWithPermissions: RoleWithPermissions = {
      ...selectedRole,
      permissions: [], // Would be populated from API
    };

    this.userRoles.push(roleWithPermissions);
    this.selectedRoleId = null;

    // Update user roles in backend
    const roleIds = this.userRoles.map((r) => r.id);
    // API call would go here to update user roles
    console.log('Assigning roles:', roleIds, 'to user:', this.user.id);
  }

  updateUser() {
    this.router.navigateByUrl('/workspace/users/' + this.user?.id + '/edit');
  }

  private loadUserRoles(): void {
    const mockUserRoles: RoleWithPermissions[] = this.user!.account_roles as RoleWithPermissions[];
    this.userRoles = mockUserRoles;
  }

  private loadProjects(): void {
    const userId = this.user!.id;
    this.projectService.all({ assignee_id: userId }).subscribe({
      next: (projects) => {
        this.projects = projects.filter(
          (p) => p.assignee_id === userId || p.owner_user_id === userId
        );
        this.cdr.markForCheck();
      },
      error: (error) => console.error('Error loading projects:', error),
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'done':
        return 'badge bg-success';
      case 'in_progress':
        return 'badge bg-primary';
      case 'not_started':
        return 'badge bg-warning';
      case 'on_hold':
        return 'badge bg-secondary';
      case 'blocked':
        return 'badge bg-danger';
      default:
        return 'badge bg-light text-dark';
    }
  }

  getStatusLabel(status: string): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  getProjectProgress(project: Project): number {
    const totalWorkItems = project.work_items?.length || 0;
    if (totalWorkItems === 0) return 0;
    const completedWorkItems = project.work_items?.filter((w) => w.completed).length || 0;
    return Math.round((completedWorkItems / totalWorkItems) * 100);
  }

  editMember(): void {
    if (this.user?.id) {
      this.router.navigate(['/users', this.user.id, 'edit']);
    }
  }

  getRoleAccess(roleName: string): string {
    const accessMap: { [key: string]: string } = {
      'admin': 'Full system access, user management, and configuration',
      'owner': 'Complete project ownership and team management',
      'member': 'Standard access to assigned projects and tasks',
      'viewer': 'Read-only access to projects and reports',
      'manager': 'Team management and project oversight capabilities'
    };
    return accessMap[roleName.toLowerCase()] || 'Standard role permissions';
  }
}
