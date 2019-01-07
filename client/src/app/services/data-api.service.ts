import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import {AuthService} from './auth.service'

import { BookInterface } from "../models/book-interface";

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(private http: HttpClient, private autService: AuthService) {}

   // se declaran 2 propiedades
   books: Observable<any>;
   book: Observable<any>;

   public selectBook: BookInterface = {
     id: null,
     titulo: '',
     idioma: '',
     descripcion: '',
     portada: '',
     precio: '',
     link_amazon: '',
     autor: '',
     oferta: ''
   };

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.autService.getToken()
  });
  getAllBooks() {
    const url_api = 'http://localhost:3000/api/books';
    return this.http.get(url_api);
  }

  getNoOffers() {
    const url_api = `http://localhost:3000/api/books?filter[where][oferta]=0`;
    return (this.books = this.http.get(url_api));
  }

  // http://localhost:3000/api/books/5bdb074e57e05f000a5bcfb4

  getBooksById(id: string) {
    const url_api = `http://localhost:3000/api/books/${id}`;
    return (this.book = this.http.get(url_api));
  }
  
  getOffers() {
    const url_api = `http://localhost:3000/api/books?filter[where][oferta]=1`;
    return (this.books = this.http.get(url_api));
  }

  saveBook(book: BookInterface) {
    //TODO obtener token
    // TODO not null
    let token = this.autService.getToken();
    const url_api = `http://localhost:3000/api/books?access_token=${token}`;
    return this.http.post<BookInterface>(url_api, book, {headers: this.headers}).pipe(map(data => data));
  }

  updateBook(book) {
    //TODO obtener token
    // TODO not null
    const bookId = book.bookId;
    let token = this.autService.getToken();
    const url_api = `http://localhost:3000/api/books/${bookId}/?access_token=${token}`;
    return this.http.put<BookInterface>(url_api, book, {headers: this.headers}).pipe(map(data => data));
  }

  deleteBook(id) {
    //TODO obtener token
    // TODO not null
    let token = this.autService.getToken();
    const url_api = `http://localhost:3000/api/books/${id}?access_token=${token}`;
    return this.http.delete<BookInterface>(url_api, {headers: this.headers}).pipe(map(data => data));
  }

}
