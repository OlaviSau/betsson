import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieListComponent} from './movie-list.component';
import {Action, Store, StoreModule} from '@ngrx/store';
import {MovieSearchComponent} from '../movie-search/movie-search.component';
import {StarRatingModule} from 'angular-star-rating';
import {AppRoutingModule} from '../app-routing.module';
import {MovieDetailComponent} from '../movie-detail/movie-detail.component';
import {APP_BASE_HREF} from '@angular/common';
import {genreReducer, moviesReducer, searchReducer} from '../reducers';
import {Genre} from '../models/genre';
import {Movie} from '../models/movie';
import {AppState} from '../app.state';
import {Search} from '../actions/search';
import {GenrePicked} from '../actions/genre-picked';

/* tslint:disable:max-line-length */
const BAD_BOYS_MOVIE = {
  id: 23,
  key: 'bad-boys',
  name: 'Bad Boys',
  description: 'description #1',
  genres: [Genre.action, Genre.comedy, Genre.crime],
  rate: 6.8,
  length: '1hr 59mins',
  img: 'bad-boys.jpg'
};

const DEADPOOL_MOVIE = {
  id: 1,
  key: 'deadpool',
  name: 'Deadpool',
  description: 'description #1',
  genres: [Genre.action, Genre.adventure, Genre.comedy],
  rate: 8.6,
  length: '1hr 48mins',
  img: 'deadpool.jpg'
};

const JURASSIC_WORLD_MOVIE = {
  id: 8,
  key: 'jurassic-world',
  name: 'Jurassic World',
  description: 'description #2',
  genres: [Genre.action, Genre.adventure, Genre.scifi],
  rate: 7.1,
  length: '2hr 4mins',
  img: 'jurassic-world.jpg'
};

const WE_ARE_THE_MILLERS_MOVIE = {
  id: 2,
  key: 'we-are-the-millers',
  name: 'We\'re the Millers',
  description: 'description #2',
  genres: [Genre.adventure, Genre.comedy, Genre.crime],
  rate: 7.0,
  length: '1hr 50mins',
  img: 'we-are-the-millers.jpg'
};
/* tslint:enable:max-line-length */

const SET_MOVIES = 'SET_MOVIES';

export class SetMovies implements Action {
  readonly type = SET_MOVIES;

  constructor(public movies: Movie[]) {}
}


function mutableMoviesReducer(state: Movie[] = [], action: Action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return (action as SetMovies).movies;
    default:
      return moviesReducer(state, action);
  }
}


describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        StarRatingModule.forRoot(),
        StoreModule.forRoot({
          movies: mutableMoviesReducer,
          search: searchReducer,
          genre: genreReducer
        })
      ],
      declarations: [ MovieListComponent, MovieSearchComponent, MovieDetailComponent],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of movies', () => {
    store.dispatch(new SetMovies([
      BAD_BOYS_MOVIE
    ]));
    fixture.detectChanges();
    expect(document.querySelectorAll('.movie').length).toEqual(1);
  });

  it('should filter by search', () => {
    store.dispatch(new SetMovies([
      BAD_BOYS_MOVIE,
      DEADPOOL_MOVIE
    ]));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(2);

    store.dispatch(new Search('Deadpool'));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(1);
  });

  it('should filter by genre', () => {
    store.dispatch(new SetMovies([
      BAD_BOYS_MOVIE,
      DEADPOOL_MOVIE
    ]));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(2);

    store.dispatch(new GenrePicked(Genre.adventure));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(1);
  });

  it('should filter by genre and search', () => {
    store.dispatch(new SetMovies([
      BAD_BOYS_MOVIE,
      DEADPOOL_MOVIE,
      JURASSIC_WORLD_MOVIE,
      WE_ARE_THE_MILLERS_MOVIE
    ]));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(4);

    // two movies have Genre.crime, but only one of them has description #1
    store.dispatch(new GenrePicked(Genre.crime));
    store.dispatch(new Search('description #1'));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(1);

    // Reverse to verify
    store.dispatch(new Search(''));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(2);

    store.dispatch(new GenrePicked('all'));
    store.dispatch(new Search('description #1'));
    fixture.detectChanges();

    expect(document.querySelectorAll('.movie').length).toEqual(2);
  });

  it('should display movie title, image, description and rating', () => {
    store.dispatch(new SetMovies([
      BAD_BOYS_MOVIE
    ]));

    fixture.detectChanges();

    const movie = document.querySelector('.movie');

    // fragile test, but might catch issues from property name changes
    expect(movie.querySelector('.movie-image').getAttribute('src')).toContain(BAD_BOYS_MOVIE.img);
    expect(movie.querySelector('.movie-title').textContent).toEqual(BAD_BOYS_MOVIE.name);
    expect(movie.querySelector('.movie-description').textContent).toEqual(BAD_BOYS_MOVIE.description);
    expect(movie.querySelector('.movie-rating star-rating').getAttribute('ng-reflect-rating')).toEqual(String(BAD_BOYS_MOVIE.rate / 2));

  });

});
