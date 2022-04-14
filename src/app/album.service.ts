import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Album, List } from './album';
import { ALBUM_LISTS, ALBUMS } from './mock-albums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// définition des headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  sendCurrentNumberPage = new Subject<number>();

  subjectAlbum = new Subject<Album>();

  private albumsUrl = 'https://app-music-92a73-default-rtdb.europe-west1.firebasedatabase.app/albums';
  private albumListsUrl = 'https://app-music-92a73-default-rtdb.europe-west1.firebasedatabase.app/albumLists';

  constructor(private http: HttpClient) { }

  // getAlbums(): Album[] {
  //   return this._albums.sort(
  //     (a, b) => { return b.duration - a.duration }
  //   );
  // }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      // Préparation des données avec _.values pour avoir un format exploitable dans l'applimap(albums => _.values(albums)),
      // Ordonnez les albums par ordre de durées décroissantes
      map(albums => {
        return this._albums.sort(
          (a, b) => { return b.duration - a.duration }
        );
      })
    )
  }

  // getAlbum(id: string) {
  //   return this._albums.find(album => album.id === id);
  // }

  getAlbum(id: string): Observable<Album> {

    return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
      map(album => album)
    );
  }


  // getAlbumList(id: string) {
  //   return this._albumList.find(list => list.id === id);
  // }

  getListAlbum(id: string): Observable<List> {
    return this.http.get<List>(this.albumListsUrl + `/${id}/.json`);
  }

  // count(): number {
  //   return this._albums.length;
  // }

  count(): Observable<number> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json').pipe(
      map(albums => albums.length),
    );
  }

  // paginate(start: number, end: number): Album[] {
  //   return this._albums.sort(
  //     (a, b) => { return b.duration - a.duration }
  //   ).slice(start, end);
  // }

  paginate(start: number, end: number): Observable<Album[]> {

    // Vous devez faire le mapping avant la récupération des données
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      // Ordonner les albums par ordre de durée décroissante
      map(albums => {
        return albums.sort(
          (a, b) => { return b.duration - a.duration }
        ).slice(start, end); // slicing des données
      })
    )
  }

  // search(word: string): Album[] {
  //   return this._albums.filter(album => album.title.includes(word));
  // }

  search(word: string): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + `/.json`).pipe(
      map(albums => {
        let search: Album[] = [];
        let re = new RegExp('^' + word.trim())
        albums.forEach((v: Album, k: any) => {
          v.id = k;
          if (v.title.match(re) != null) search.push(v);
        })

        return search;
      })
    );
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  // Audio-player 
  switchOn(album: Album): void {
    album.status = 'on';
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(() => {
      this.subjectAlbum.next(album);
    }
    );
  }

  switchOff(album: Album): void {
    album.status = 'off';
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(() => {
    });
  }

}
