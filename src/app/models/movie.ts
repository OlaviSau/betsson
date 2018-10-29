

import {Genre} from './genre';

export interface Movie {
    id: number;
    key: string;
    name: string;
    description: string;
    genres: Genre[];
    rate: number;
    length: string;
    img: string;
}
