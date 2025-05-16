import { Routes } from '@angular/router';
import { HistogramComponent } from './histogram/histogram.component';
import { MazeComponent } from './maze/maze.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { APP_ROUTES } from './shared-constants';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: APP_ROUTES.HISTOGRAM, component: HistogramComponent },
  { path: APP_ROUTES.MAZE, component: MazeComponent },
];
