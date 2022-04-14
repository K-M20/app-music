import { Component } from '@angular/core';
import { interval, Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  count: Observable<number> | undefined;
  time: string = "";

  constructor(public auth: AuthService) {
    this.count = interval(1000)
    const interval$ = this.count.
      pipe(
        map(sec => {
          let hours = Math.floor(sec / 3600);
          let minutes = Math.floor(sec / 60);
          return `${hours} h ${minutes - hours * 60} min ${sec - minutes * 60} s`;
        }),
        take(12 * 60 * 3) // arret a 12 * 3 minutes (specifique a rxjs 6)
      );

    interval$.subscribe( // souscription à l'interval subscribe
      time => this.time = time
    );
  }
}
