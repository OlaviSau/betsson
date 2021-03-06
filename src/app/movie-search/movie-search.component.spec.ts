import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchComponent } from './movie-search.component';
import {Store, StoreModule} from '@ngrx/store';
import {AppState} from '../app.state';
import {moviesReducer, searchReducer, genreReducer} from '../reducers';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          StoreModule.forRoot({
            movies: moviesReducer,
            search: searchReducer,
            genre: genreReducer
          })
      ],
      declarations: [ MovieSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
