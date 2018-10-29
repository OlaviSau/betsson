

import {Genre} from './genre';

export interface Movie {
    id: number;
    key: string;
    name: string;
    description: string;
    genres: Genre[];
    rate: string;
    length: string;
    img: string;
}
