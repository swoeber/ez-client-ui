import { Component, inject, OnInit } from '@angular/core';
import { Client, ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { Observable, map, combineLatest } from 'rxjs';
import { Project, ProjectQueryParams, ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

interface ProjectStats {
  active: number;
  overdue: number;
}

interface ClientStats {
  total: number;
  newThisMonth: number;
}

interface RevenueStats {
  thisMonth: number;
  pending: number;
}

interface TaskStats {
  dueToday: number;
  overdue: number;
}

interface Activity {
  id: string;
  message: string;
  timestamp: Date;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  clientService: ClientService = inject(ClientService);
  projectService: ProjectService = inject(ProjectService);
  router: Router = inject(Router);

  projectStats: ProjectStats = { active: 0, overdue: 0 };
  clientStats: ClientStats = { total: 0, newThisMonth: 0 };
  revenueStats: RevenueStats = { thisMonth: 0, pending: 0 };
  taskStats: TaskStats = { dueToday: 0, overdue: 0 };
  recentActivity: Activity[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    const clients$ = this.clientService.getClients();
    const projects$ = this.projectService.all({ sort: 'due_on', direction: 'desc' });

    combineLatest([clients$, projects$]).subscribe(([clients, projects]) => {
      this.calculateProjectStats(projects);
      this.calculateClientStats(clients);
      this.calculateRevenueStats();
      this.calculateTaskStats(projects);
      this.generateRecentActivity(projects, clients);
    });
  }

  private calculateProjectStats(projects: Project[]) {
    const today = new Date();
    const activeProjects = projects.filter(p => p.status !== 'done');
    const overdueProjects = activeProjects.filter(p => p.due_on && new Date(p.due_on) < today);
    
    this.projectStats = {
      active: activeProjects.length,
      overdue: overdueProjects.length
    };
  }

  private calculateClientStats(clients: Client[]) {
    const thisMonth = new Date();
    thisMonth.setDate(1);
    
    const newThisMonth = clients.filter(c => 
      c.created_at && new Date(c.created_at) >= thisMonth
    ).length;
    
    this.clientStats = {
      total: clients.length,
      newThisMonth
    };
  }

  private calculateRevenueStats() {
    // Mock data - replace with actual invoice service
    this.revenueStats = {
      thisMonth: 15750,
      pending: 3200
    };
  }

  private calculateTaskStats(projects: Project[]) {
    // Mock data - replace with actual task service
    this.taskStats = {
      dueToday: 5,
      overdue: 2
    };
  }

  private generateRecentActivity(projects: Project[], clients: Client[]) {
    const activities: Activity[] = [];
    
    // Add recent project activities
    projects.slice(0, 3).forEach(project => {
      activities.push({
        id: `project-${project.id}`,
        message: `Project "${project.name}" was updated`,
        timestamp: new Date(project.updated_at || project.created_at),
        icon: 'bi-kanban-fill'
      });
    });
    
    // Add recent client activities
    clients.slice(0, 2).forEach(client => {
      activities.push({
        id: `client-${client.id}`,
        message: `New client "${client.first_name}" was added`,
        timestamp: new Date(client.created_at),
        icon: 'bi-person-plus-fill'
      });
    });
    
    this.recentActivity = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  }

  goToProjects() {
    this.router.navigateByUrl('workspace/projects');
  }

  goToClients() {
    this.router.navigateByUrl('workspace/clients');
  }

  openOnboarding() {}

  createProject() {
    this.router.navigate(['workspace/projects/new']);
  }

  inviteClient() {}

  goFiles() {}

  newInvoice() {}


}
