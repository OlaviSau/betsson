import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Movie} from '../models/movie';
import {ActivatedRoute} from '@angular/router';

interface MovieKeyRoute {
  key: string;
}

@Component({
  selector: 'bg-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie: Movie;
  private routeSubscriber: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscriber = this.route.params.subscribe(params => {
        this.store.select('movie').subscribe(
            movies => this.movie = movies.find(movie => movie.key === params['key'])
        );
    });
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
  }

}
