import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  time: string = "";

  constructor(public auth: AuthService) {
    const interval$ = interval(1000).
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
