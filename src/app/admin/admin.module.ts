import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { GuardService } from '../guard.service';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AlbumComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
  ],
  exports: [AlbumComponent, RouterModule]
})
export class AdminModule { }