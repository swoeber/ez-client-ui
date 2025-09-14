import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFormComponent } from '../../components/form/project-form.component';
import { Project, ProjectService } from '../../../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form-page',
  imports: [CommonModule, ProjectFormComponent],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.scss',
})
export class ProjectFormPageComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);

  project?: Project;
  isEdit = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];
    if (projectId) {
      this.isEdit = true;
      this.loading = true;
      this.projectService.get(+projectId).subscribe({
        next: (project) => {
          this.project = project;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/workspace/projects']);
        },
      });
    }
  }

  onSaveProject(projectData: Partial<Project>) {
    console.log('Saving project:', projectData);
    // TODO: Implement save logic
    this.router.navigate(['/workspace/projects']);
  }

  onCancel() {
    this.router.navigate(['/workspace/projects']);
  }
}
