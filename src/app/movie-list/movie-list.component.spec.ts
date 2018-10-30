import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import {StoreModule} from '@ngrx/store';
import {MovieSearchComponent} from '../movie-search/movie-search.component';
import {StarRatingModule} from 'angular-star-rating';
import {AppRoutingModule} from '../app-routing.module';
import {MovieDetailComponent} from '../movie-detail/movie-detail.component';
import {APP_BASE_HREF} from '@angular/common';
import {moviesReducer, searchReducer, genreReducer} from '../reducers';
import {Genre} from '../models/genre';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        StarRatingModule.forRoot(),
        StoreModule.forRoot({
          movies: moviesReducer,
          search: searchReducer,
          genre: genreReducer
        },
          {
            initialState: {
              movies: [{
                id: 23,
                key: 'bad-boys',
                name: 'Bad Boys',
                description: 'Two hip detectives protect a murder witness while investigating a case of stolen heroin.',
                genres: [Genre.action, Genre.comedy, Genre.crime],
                rate: 6.8,
                length: '1hr 59mins',
                img: 'bad-boys.jpg'
              }],
              search: '',
              genre: 'all'
            }
          })
      ],
      declarations: [ MovieListComponent, MovieSearchComponent, MovieDetailComponent],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
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
});
