import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpageComponent } from './Startpage/startpage.component'; 

const appRoutes: Routes = [
  { path: 'startpage', component: StartpageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);