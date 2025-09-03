import { Component } from '@angular/core';
import { SideMenu } from '../layout/workspace/side-menu/side-menu';
import { Header } from '../layout/workspace/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace',
  imports: [SideMenu, Header, RouterOutlet],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {}
