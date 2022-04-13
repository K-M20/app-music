import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  album: Album | undefined;
  // album: Album;

  constructor(private route: ActivatedRoute, private aS: AlbumService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.album = this.aS.getAlbum(id);
  }
}