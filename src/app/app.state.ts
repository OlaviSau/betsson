import {Movie} from './models/movie';

export interface AppState {
    readonly movies: Movie[];
    readonly genre: string;
    readonly search: string;
}
