import { Action } from '@ngrx/store';
import {SEARCH} from '../actions/search';

export function searchReducer(state: string = '', action: Action) {
        switch (action.type) {
        case SEARCH:
            return action['searchTerm'];
        default:
            return state;
    }
}


