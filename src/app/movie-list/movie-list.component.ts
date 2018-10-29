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
      this.movies = combineLatest(
          store.select('movie'),
          store.select('search'),
          store.select('genre')
      ).pipe(
          map(([movies, search, genre]) => movies.filter(
             movie => MovieListComponent.isMovieMatch(movie, search, genre)
          ))
      );
  }

  private static isMovieMatch(movie, search, genre) {
      let genreResult = true;
      let searchResult = true;
      if (genre !== 'all') {
          genreResult = movie.genres.includes(genre);
      }

      if (search) {
         search = search.toLowerCase();
         searchResult = movie.name.toLowerCase().includes(search) || movie.description.toLowerCase().includes(search);
      }
      return genreResult && searchResult;
  }

}
