import { Component, OnInit } from '@angular/core';
import {Genre} from '../models/genre';

@Component({
  selector: 'bg-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  genres = [
      {value: Genre.action, label: 'Action'},
      {value: Genre.scifi, label: 'Sci-fi'},
  ];
  constructor() {}

  ngOnInit() {
  }

}
