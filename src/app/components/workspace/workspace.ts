import { Component, inject, OnInit } from '@angular/core';
import { SideMenu } from '../layout/workspace/side-menu/side-menu';
import { Header } from '../layout/workspace/header/header';
import { RouterOutlet, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-workspace',
  imports: [SideMenu, Header, RouterOutlet, CommonModule],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace implements OnInit {
  private router = inject(Router);
  loadingService = inject(LoadingService);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else {
        this.loadingService.hide();
      }
    });
  }
}
