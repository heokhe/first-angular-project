import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { from, of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { ToSymbolPipe } from './to-symbol.pipe';

describe('AppComponent', () => {
  let dataService: jasmine.SpyObj<DataService>;
  beforeEach(async () => {
    dataService = jasmine.createSpyObj('DataService', ['getEquations']);
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatSnackBarModule],
      declarations: [AppComponent, ToSymbolPipe],
      providers: [
        {
          provide: DataService,
          useValue: dataService,
        },
      ],
    }).compileComponents();
  });

  it("shows a snackbar if numbers.json doesn't exist", () => {
    dataService.getEquations.and.throwError('not found');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li')).toHaveSize(0);
    expect(
      compiled.ownerDocument.querySelector('.mat-snack-bar-container')
    ).toBeTruthy();
  });

  it('displays the items correctly', () => {
    dataService.getEquations.and.returnValues(
      from([
        {
          value: 5,
          secondValue: 10,
          action: 'add',
          result: 15,
        },
        null, // the result of a non-existent operation
      ])
    );
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    expect(items).toHaveSize(2);
    expect(items[0].textContent).toContain('5 + 10 = 15');
    expect(items[1].textContent).toContain('MISSING DATA');
  });
});
