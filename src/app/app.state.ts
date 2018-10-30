import {Movie} from './models/movie';

export interface AppState {
    readonly movie: Movie[];
    readonly genre: '';
    readonly search: '';
}
