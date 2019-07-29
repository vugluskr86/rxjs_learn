import { fromEvent, from, of, throwError } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter, catchError, flatMap } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { fromFetch } from 'rxjs/fetch';

const searchBox = document.getElementById('search');
const results = document.getElementById('results');
const errorBox = document.getElementById('error');


const reset = () => {
    errorBox.innerHTML = '';
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

const input$ = fromEvent(searchBox, 'input')
.pipe(
    debounceTime(350),
    map(e => (<HTMLInputElement>e.target).value),
    filter(query => query.length >= 2 || query.length === 0), 
    distinctUntilChanged(), 
    switchMap(
        term => fromFetch(`https://api.github.com/search/users?q=${term}`)
    ),
    flatMap(response => response.ok ? response.json() : throwError(response)),
);
    
input$.subscribe(
    (data) => {
        reset();
        data.items.map((element:any) => {
            let newResult = document.createElement('li');
            newResult.textContent = element.login;
            results.appendChild(newResult);
        })
    },
    (err) => {
        reset();
        errorBox.innerHTML = err.statusText;
    },
    () => {},
);