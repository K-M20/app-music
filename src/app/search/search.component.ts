import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter(); // émission des données vers le parent

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    // récupération des données du formulaire
    // let results = this.albumService.search(form.value['word']);
    // if (results.length > 0) this.searchAlbums.emit(results);
    // console.log(results);
    this.albumService.search(form.value['word']).subscribe(
      albums => {
        if (albums.length > 0) this.searchAlbums.emit(albums);
      }
    )
  }
}