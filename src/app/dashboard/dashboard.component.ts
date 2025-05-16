import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../shared-constants';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  APP_ROUTES = APP_ROUTES;
}
