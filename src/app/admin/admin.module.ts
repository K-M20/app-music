import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { GuardService } from '../guard.service';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './addalbum/addalbum.component';
import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: 'admin/add', canActivate: [GuardService], component: AddAlbumComponent },
]
@NgModule({
  declarations: [
    AlbumComponent,
    AddAlbumComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes), // définition des routes dans le sous-module
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AlbumComponent, RouterModule]
})
export class AdminModule { }