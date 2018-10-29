import { Action } from '@ngrx/store';

export const SEARCH       = 'SEARCH';

export class Search implements Action {
    readonly type = SEARCH;

    constructor(public searchTerm: string) {}
}
