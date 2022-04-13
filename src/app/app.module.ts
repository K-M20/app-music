import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginateComponent } from './paginate/paginate.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


const app = initializeApp(environment.firebaseConfig);



const albumsRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'albums',
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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    DescriptionComponent,
    PaginateComponent,
    AudioPlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(albumsRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
