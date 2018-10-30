import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { StoreModule } from '@ngrx/store';
import {genreReducer, moviesReducer, searchReducer} from './reducers';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import {StarRatingModule} from 'angular-star-rating';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    StoreModule.forRoot({
        movies: moviesReducer,
        search: searchReducer,
        genre: genreReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
