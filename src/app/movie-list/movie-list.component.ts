import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'bg-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: Observable<Movie[]>;
  constructor(private store: Store<AppState>) {
      this.movies = store.select('movie');
  }

  ngOnInit() {
  }

}
