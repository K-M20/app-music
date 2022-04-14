import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[] | undefined;

  constructor(private aS: AlbumService) { }

  ngOnInit(): void {
    this.aS.paginate(0, 3).subscribe(albums => this.albums = albums);
  }

  paginate($event: { start: number; end: number; }) {
    this.aS.paginate($event.start, $event.end).subscribe(
      albums => this.albums = albums
    );
  }

}
