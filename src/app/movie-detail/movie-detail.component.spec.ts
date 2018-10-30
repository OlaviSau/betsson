import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import {Store, StoreModule} from '@ngrx/store';
import {genreReducer, movieReducer, searchReducer} from '../reducers';
import {AppRoutingModule} from '../app-routing.module';
import {StarRatingModule} from 'angular-star-rating';
import {MovieListComponent} from '../movie-list/movie-list.component';
import {MovieSearchComponent} from '../movie-search/movie-search.component';
import {APP_BASE_HREF} from '@angular/common';
import {Genre} from '../models/genre';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        StarRatingModule.forRoot(),
        StoreModule.forRoot({
          movie: movieReducer,
          search: searchReducer,
          genre: genreReducer
        }, {
          initialState: {
            movie: [{
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
            genre: ''
          }
        })
      ],
      declarations: [MovieListComponent, MovieSearchComponent, MovieDetailComponent],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }, {
        provide: ActivatedRoute,
        useValue: {
          params: Observable.create(observer => observer.next({key: 'bad-boys'}))
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
