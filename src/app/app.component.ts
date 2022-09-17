import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, IEquation } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  equations: (IEquation | null)[] = [];
  constructor(
    private dataService: DataService,
    private _snackbar: MatSnackBar
  ) {}
  private showErrorSnackbar() {
    this._snackbar.open('Server Error');
  }
  ngOnInit() {
    try {
      this.dataService.getEquations().subscribe({
        next: (equation) => {
          this.equations.push(equation);
        },
        error: () => {
          this.showErrorSnackbar();
        },
      });
    } catch {
      this.showErrorSnackbar();
    }
  }
}
