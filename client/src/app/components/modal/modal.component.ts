import { Component, OnInit } from '@angular/core';
import {DataApiService} from './../../services/data-api.service';
import {BookInterface} from './../../models/book-interface';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApiService: DataApiService, private location: Location) { }

  ngOnInit() {
  }
  // Void quiere decir que no devuelve nada
  onSaveBook(bookForm: NgForm): void{
    if(bookForm.value.bookId == null){
      //new
      this.dataApiService.saveBook(bookForm.value).subscribe(book => location.reload());
    }else{
      // update
      this.dataApiService.updateBook(bookForm.value).subscribe(book => location.reload());
    }
  }
}
