import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Movie} from '../models/movie';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bg-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie: Movie;
  private routeSubscription: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: { key: string }) =>
        this.store.select('movies').subscribe(
            movies => this.movie = movies.find(movie => movie.key === params.key)
        )
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
