import route from 'ziggy-js';
import { Ziggy } from './routes';

export function ziggyJs(name, params, absolute = false) {
    return route(name, params, absolute, Ziggy);
}