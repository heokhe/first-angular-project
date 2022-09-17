import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService, INumber, IOperation, IStatement } from './data.service';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = new DataService(httpClient);
  });

  it('should return expected numbers', (done) => {
    const data: INumber[] = [
      { value: 1, action: 'add' },
      { value: 2, action: 'multiply' },
    ];
    const statements: IStatement[] = [];
    service.getNumbers().subscribe((statement) => {
      const index = statements.length;
      expect(statement).toBeTruthy();
      statements.push(statement!);

      if (index === 0) {
        expect(statement!.result).toEqual(4);
      }

      if (index === 1) {
        expect(statement!.result).toEqual(20);

        expect(statements.map((st) => st.value))
          .withContext('preserves the order')
          .toEqual(data.map((d) => d.value));

        done();
      }
    });
    httpTestingController.expectOne('/assets/numbers.json').flush(data);
    httpTestingController
      .expectOne('/assets/add.json')
      .flush({ value: 3 } as IOperation);
    httpTestingController
      .expectOne('/assets/multiply.json')
      .flush({ value: 10 } as IOperation);
  });

  it('should handle non-existent operations', (done) => {
    service.getNumbers().subscribe((statement) => {
      expect(statement).toBeFalsy();
      done();
    });
    httpTestingController
      .expectOne('/assets/numbers.json')
      .flush([{ value: 1, action: 'add' }]);
    httpTestingController
      .expectOne('/assets/add.json')
      .flush(new HttpErrorResponse({ status: 404 }));
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
