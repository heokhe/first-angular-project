import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { DataService, IStatement } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'first-angular-project';
  statements: (IStatement | null)[] = [];
  constructor(
    private dataService: DataService,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit() {
    this.dataService.getNumbers().subscribe(
      (statement) => {
        this.statements.push(statement);
      },
      () => {
        this._snackbar.open('Server Error');
      }
    );
  }
}
