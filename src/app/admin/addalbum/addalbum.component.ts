import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from 'src/app/album.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addalbum',
  templateUrl: './addalbum.component.html',
  styleUrls: ['./addalbum.component.scss']
})

export class AddAlbumComponent implements OnInit {
  albumForm: any;

  constructor(private fb: FormBuilder, private aS: AlbumService) {
    this.fb.group({
      ref: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }
  ngOnInit() {

  }

  get name() {
    return this.albumForm.get('name');
  }

  onSubmit() {
    console.log(this.albumForm.value['name']);
  }

}

