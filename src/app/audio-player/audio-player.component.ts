import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  showplayer: boolean = false;
  current: number = 1;
  total: number = 1;
  ratio: number = 0;
  albumPlay: Album = new Album;
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.subjectAlbum.subscribe(
      album => {
        this.albumPlay = album;
        this.showplayer = true;
        this.current = 1;
        let duration = this.albumPlay.duration;
        this.total = Math.floor(duration / 120);
        this.ratio = Math.floor(100 / this.total);
        let step = this.ratio;

        const timer = 120 * 1000;

        const player = setInterval(() => {
          this.current++;
          this.ratio += step;
          console.log(this.ratio);
          if (this.ratio > 100) {
            clearInterval(player);
            this.showplayer = false;
            this.albumService.switchOff(this.albumPlay);
          }
        }, timer)
      }
    )
  }

}
