import { interval, range, Observable } from 'rxjs';
import { take, audit, takeWhile, filter, map, scan } from 'rxjs/operators';

const debug = (start:number) => {
    return (value:any) => {
        console.log(Date.now() - start, value);
    };    
};

interval(500).pipe( // Генеринует событи каждые 500 ms, 0 ... n  
    take(9), // Первые 9 
    audit(() => interval(1000)) // Раз в секунду забираем последнее значение
).subscribe(debug(Date.now()), console.error, console.log.bind(console, 'Complete'));     

interval(500).pipe( // Генеринует событи каждые 500 ms, 0 ... n 
    takeWhile((val:number, index:number) => index <= 10) // Первые 10 элементов
).subscribe(console.log, console.error, console.log.bind(console, 'Complete'));

range(0, 10).pipe( // Генеринует 0 ... 10
    filter((x:number) => x % 2 === 0), // Четные
    map((x:number) => x + x), // Квадрат
    scan((acc:number, x:number) => acc + x, 0) // reduce
).subscribe(console.log, console.error, console.log.bind(console, 'Complete'));


