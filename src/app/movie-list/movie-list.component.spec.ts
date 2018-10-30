import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import {StoreModule} from '@ngrx/store';
import {MovieSearchComponent} from '../movie-search/movie-search.component';
import {StarRatingModule} from 'angular-star-rating';
import {AppRoutingModule} from '../app-routing.module';
import {MovieDetailComponent} from '../movie-detail/movie-detail.component';
import {APP_BASE_HREF} from '@angular/common';
import {movieReducer, searchReducer, genreReducer} from '../reducers';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        StarRatingModule.forRoot(),
        StoreModule.forRoot({
          movie: movieReducer,
          search: searchReducer,
          genre: genreReducer
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
});
