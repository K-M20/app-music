import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Output() setPaginate: EventEmitter<{ start: number; end: number, currentPage: number }> = new EventEmitter();

  pages: number[] = []; // pages num
  @Input() perPage: number; // number album(s) per page variable d'env
  total = 0; // total albums
  numberPages = 0;
  @Input() currentPage: number = 0;

  constructor(private aS: AlbumService) {
    this.perPage = 3;
  }

  ngOnInit(): void {
    this.init();
  }

  /**
   * init paginate
   * @param page
   */
  init(page: number = 1) {
    this.aS.count().subscribe(count => {
      this.numberPages = Math.ceil(count / this.perPage);
      this.currentPage = page;
      this.pages = [];
      for (let i = 1; i < this.numberPages + 1; i++) {
        this.pages.push(i);
      }
    })
  }

  selectedPage(page: number) {
    this.currentPage = page;
    this.setPaginate.emit(this.paginate(page));
  }

  next() {
    if (this.currentPage >= this.numberPages) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));
  }

  previous() {
    if (this.currentPage === 1) {
      this.currentPage = this.numberPages;
    } else {
      this.currentPage--;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));

  }

  paginate(page: number): { start: number, end: number, currentPage: number } {
    const start = (page - 1) * this.perPage; // 0 2
    const end = start + this.perPage; // 2 4

    return { start: start, end: end, currentPage: this.currentPage };
  }
}
