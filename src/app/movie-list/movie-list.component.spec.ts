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
  description: 'Two hip detectives protect a murder witness while investigating a case of stolen heroin.',
  genres: [Genre.action, Genre.comedy, Genre.crime],
  rate: 6.8,
  length: '1hr 59mins',
  img: 'bad-boys.jpg'
};

const DEADPOOL_MOVIE = {
  id: 1,
  key: 'deadpool',
  name: 'Deadpool',
  description: 'A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.',
  genres: [Genre.action, Genre.adventure, Genre.comedy],
  rate: 8.6,
  length: '1hr 48mins',
  img: 'deadpool.jpg'
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
        },
          {
            initialState: {
              movies: [BAD_BOYS_MOVIE],
              search: '',
              genre: 'all'
            }
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

  it('should display one movie', () => {
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

});
