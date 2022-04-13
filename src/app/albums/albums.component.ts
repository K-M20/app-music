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

  titlePage: string = "Music App Main Page";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album = new Album;
  status: string | null = null;
  count: any;

  albumPlaying: number | string = 0;

  constructor(private albumService: AlbumService) {
    // console.log(this.albumService.count());
    // récupération des données depuis Firebase avec la méthode HttpClient
    console.log(this.albumService.getAlbums().subscribe(
      albums => console.log('-*-*-*-*---*', albums)
    ))
  }

  ngOnInit(): void {
    // this.albums = this.albumService.paginate(0, 2);
    this.albumService.paginate(0, 5).subscribe(albums => this.albums = albums);
    this.count = this.albumService.count().subscribe(
      count => this.count = count
    );
  }

  onSelect(album: Album) {
    // console.log(album);
    this.selectedAlbum = album;
    console.log('++', album);
  }

  playParent(album: Album) {
    console.log(album);
    this.albumPlaying = album.id;
    this.albumService.switchOn(album);
  }

  search($event: Album[]) {
    if ($event) this.albums = $event;
  }

  currentPage: number = 1;

  paginate(album: { start: number, end: number, currentPage: number }) {
    this.currentPage = album.currentPage;
    // this.albums = this.albumService.paginate(album.start, album.end);
    this.albumService.paginate(album.start, album.end).subscribe(
      albums => this.albums = albums
    )
  }

}