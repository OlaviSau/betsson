import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs/index';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'bg-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {


  movies: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {
      this.movies = combineLatest(store.select('movie'), store.select('search')).pipe(
          map(([movies, search]) => movies.filter(
             movie => MovieListComponent.isMovieMatch(movie, search)
          ))
      );
  }

  private static isMovieMatch(movie, search) {
      if (search) {
         search = search.toLowerCase();
         return movie.name.toLowerCase().includes(search) || movie.description.toLowerCase().includes(search);
      }
      return true;
  }

}
