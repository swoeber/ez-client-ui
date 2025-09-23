import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../store/user.store';
import { ProjectService, Project } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Perm } from '../../enum/permissions.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  @Input() userId!: number;

  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user: User | null = null;
  projects: Project[] = [];
  clientRatingAverage: number | null = null;

  availablePermissions = [
    {
      id: 1,
      name: 'admin',
      label: 'Full Admin Access',
      description: 'Complete system access with all privileges',
    },
    {
      id: 2,
      name: 'read_users',
      label: 'View Users',
      description: 'View user profiles and information',
    },
    {
      id: 3,
      name: 'write_users',
      label: 'Create/Edit Users',
      description: 'Create new users and modify existing profiles',
    },
    {
      id: 4,
      name: 'read_projects',
      label: 'View Projects',
      description: 'Access project details and status',
    },
    {
      id: 5,
      name: 'write_projects',
      label: 'Create/Edit Projects',
      description: 'Create and modify project information',
    },
    {
      id: 6,
      name: 'read_clients',
      label: 'View Clients',
      description: 'Access client information and contacts',
    },
    {
      id: 7,
      name: 'write_clients',
      label: 'Create/Edit Clients',
      description: 'Add new clients and update client data',
    },
    {
      id: 8,
      name: 'read_invoices',
      label: 'View Invoices',
      description: 'Access invoice details and payment status',
    },
    {
      id: 9,
      name: 'write_invoices',
      label: 'Create/Edit Invoices',
      description: 'Generate and modify invoices',
    },
    {
      id: 10,
      name: 'read_reports',
      label: 'View Reports',
      description: 'Access system reports and analytics',
    },
    {
      id: 11,
      name: 'write_reports',
      label: 'Create/Edit Reports',
      description: 'Generate custom reports and modify templates',
    },
  ];

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.loadProjects();
  }

  private loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.error('Error loading user:', error),
    });
  }

  private loadProjects(): void {
    this.projectService.all().subscribe({
      next: (projects) => {
        this.projects = projects.filter(
          (p) => p.assignee_id === this.userId || p.owner_user_id === this.userId
        );
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

  getPermissionLabel(permissionId: string): string {
    const permission = this.availablePermissions.find((p) => p.id.toString() === permissionId);
    return permission?.label || `Permission ${permissionId}`;
  }

  hasPermission(permission: string): boolean {
    return this.user?.account_permissions?.some((p) => p === permission) || false;
  }

  hasAdminPermission(): boolean {
    return this.hasPermission(Perm.admin);
  }

  togglePermission(permission: string): void {
    if (!this.user) return;

    const hasPermission = this.hasPermission(permission);

    if (hasPermission) {
      this.user.account_permissions =
        this.user.account_permissions?.filter((p) => p !== permission) || [];
    } else {
      const newPermission: string = permission;
      this.user.account_permissions = [...(this.user.account_permissions || []), newPermission];
    }

    // console.log(this.user.account_permissions);
    this.userService.updateUser(this.user).subscribe({
      next: (updatedUser) => (this.user = updatedUser),
      error: (error) => console.error('Error updating permissions:', error),
    });
  }
}
