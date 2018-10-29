import { Action } from '@ngrx/store';
import {Genre} from '../models/genre';

export const GENRE_PICKED = 'GENRE_PICKED';

export class GenrePicked implements Action {
    readonly type = GENRE_PICKED;

    constructor(public genre: Genre | 'all') {}
}
