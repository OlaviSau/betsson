import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {genreReducer, moviesReducer, searchReducer} from './reducers';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import {StarRatingModule} from 'angular-star-rating';
import {localStorageSync} from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['search', 'genre'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

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
    }, {metaReducers}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
