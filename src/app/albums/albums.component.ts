import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album = new Album;

  albumPlaying: number | string = 0;

  constructor(private albumService: AlbumService) {
    console.log(this.albumService.count());
  }

  ngOnInit() {
    this.albums = this.albumService.paginate(0, 5);
  }

  onSelect(album: Album) {
    // console.log(album);
    this.selectedAlbum = album;
  }

  playParent(album: Album) {
    console.log(album);
    this.albumPlaying = album.id;
  }

  search($event: Album[]) {
    if ($event) this.albums = $event;
  }

}