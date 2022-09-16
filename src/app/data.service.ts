import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

export interface INumber {
  action: string;
  value: number;
}

export interface IOperation {
  value: number;
}

export interface IStatement {
  action: string;
  value: number;
  secondValue: number;
  result: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getNumbers(): Observable<IStatement | null> {
    return this.http.get<INumber[]>('/assets/numbers.json').pipe(
      mergeMap((numbers) => numbers),
      mergeMap(({ action, value }) =>
        this.http.get<IOperation>(`/assets/${action}.json`).pipe(
          catchError(() => of(null)),
          map((object) => object?.value),
          map((secondValue) =>
            secondValue === undefined
              ? null
              : {
                  action,
                  value,
                  secondValue,
                  result:
                    action === 'add'
                      ? value + secondValue
                      : value * secondValue,
                }
          )
        )
      )
    );
  }
}
