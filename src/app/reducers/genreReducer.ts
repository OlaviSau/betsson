import { Action } from '@ngrx/store';
import {GENRE_PICKED} from '../actions/genre-picked';

export function genreReducer(state: string = 'all', action: Action) {
  switch (action.type) {
    case GENRE_PICKED:
      return action['genre'];
    default:
      return state;
  }
}



