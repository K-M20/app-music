import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUM_LISTS } from '../mock-albums';
import { AlbumService } from '../album.service';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('details', [
      state('open', style({
        backgroundColor: 'yellow'
      })),
      state('opening', style({
        backgroundColor: 'red',
      })),
      transition('opening => open', [
        animate('1s')
      ]),
    ]),
  ]
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album = new Album; // propriété [album] liée 
  @Output() onPlay: EventEmitter<Album> = new EventEmitter;
  albumLists: List[] = ALBUM_LISTS;
  list: List | undefined;
  songs: Array<string> | undefined = [];
  isOpen: boolean = false;


  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
  }


  ngOnChanges() {
    // console.log(this.album);
    if (this.album) {
      // récupération de la liste des chansons
      const id = this.album.id;
      const al = this.albumLists.find(elem => elem.id === id);
      if (al) this.songs = al.list;

      // animation 
      this.isOpen = false;
      const animate = setInterval(() => {
        this.isOpen = !this.isOpen;
        clearInterval(animate);
      }
        , 10);
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
  }

}
