import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUM_LISTS } from '../mock-albums';
import { AlbumService } from '../album.service';



@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album = new Album; // propriété [album] liée 
  @Output() onPlay: EventEmitter<Album> = new EventEmitter;
  albumLists: List[] = ALBUM_LISTS;
  list: List | undefined;
  songs: Array<string> | undefined = [];

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
  }


  ngOnChanges() {
    // console.log(this.album);
    if (this.album) {
      this.list = this.ablumService.getAlbumList(this.album.ref);
      this.songs = this.albumLists.find(elem => elem.id === this.album.id)?.list;
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
  }

}
