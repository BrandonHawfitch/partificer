import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GroupResolverService } from './group/group-resolver.service';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { MembershipComponent } from './membership/membership.component';
import { PreferencesComponent } from './preferences/preferences.component';
// import { CompatibilityComponent } from './compatibility/compatibility.component';
// import { PreferencesComponent } from './preferences/preferences.component';
// import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'group',
    component: GroupComponent,
    canActivate: [AuthGuard],
    resolve: [GroupResolverService],
  },
  {
    path: 'membership',
    component: MembershipComponent,
    canActivate: [AuthGuard],
    resolve: [GroupResolverService],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [AuthGuard],
    resolve: [GroupResolverService],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
