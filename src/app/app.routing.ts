import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpageComponent } from './Startpage/startpage.component';
import { ProfilepageComponent } from './Profilepage/profilepage.component';
import { ModeratorpageComponent } from './Moderator/moderatorpage.component';
import { LoginComponent } from './Login/login.component';

const appRoutes: Routes = [
  { path: 'loginpage', component: LoginComponent },
  { path: 'profilepage', component: ProfilepageComponent },
  { path: 'startpage', component: StartpageComponent },
  { path: 'moderatorpage', component: ModeratorpageComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);