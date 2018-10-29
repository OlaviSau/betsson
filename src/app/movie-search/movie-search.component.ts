import { Component, OnInit } from '@angular/core';
import {Genre} from '../models/genre';

@Component({
  selector: 'bg-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  genres = [
      {value: 'all', label: 'All'},
      {value: Genre.action, label: 'Action'},
      {value: Genre.scifi, label: 'Sci-fi'},
      {value: Genre.adventure, label: 'Adventure'},
      {value: Genre.biography, label: 'Biography'},
      {value: Genre.comedy, label: 'Comedy'},
      {value: Genre.crime, label: 'Crime'},
      {value: Genre.drama, label: 'Drama'},
      {value: Genre.history, label: 'History'},
      {value: Genre.mystery, label: 'Mystery'},
      {value: Genre.sport, label: 'Sport'},
      {value: Genre.thriller, label: 'Thriller'},
  ];
  constructor() {}

  ngOnInit() {
  }

}
