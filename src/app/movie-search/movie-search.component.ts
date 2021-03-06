import { Component, OnInit } from '@angular/core';
import {Genre} from '../models/genre';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Search} from '../actions/search';
import {GenrePicked} from '../actions/genre-picked';
import {Observable} from 'rxjs';

@Component({
  selector: 'bg-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {

  genres = [
      {value: 'all', label: 'All'},
      {value: Genre.action, label: 'Action'},
      {value: Genre.scifi, label: 'Sci-fi'},
      {value: Genre.adventure, label: 'Adventure'},
      {value: Genre.biography, label: 'Biography'},
      {value: Genre.comedy, label: 'Comedy'},
      {value: Genre.crime, label: 'Crime'},
      {value: Genre.drama, label: 'Drama'},
      {value: Genre.history, label: 'History'},
      {value: Genre.mystery, label: 'Mystery'},
      {value: Genre.sport, label: 'Sport'},
      {value: Genre.thriller, label: 'Thriller'},
  ];

  search: Observable<string>;
  selectedGenre: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.search = store.select('search');
    this.selectedGenre = store.select('genre');
  }

  onSearch($event) {
      this.store.dispatch(new Search($event.target.value));
  }

  onGenrePicked($event) {
      this.store.dispatch(new GenrePicked($event.target.value));
  }

}
