import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DescriptionComponent } from './description/description.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './admin/album/album.component';


const albumsRoutes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'album/:id',
    component: DescriptionComponent
  },
  {
    path: 'admin', canActivate: [GuardService],
    component: AlbumComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(albumsRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
