import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-spinner',
  template: `
   <div *ngIf="isLoading$ | async" class="spinner-overlay">
      <div class="spinner-wrapper">
        <div class="spinner-circle"></div>
        <img
          src="https://web-dirsio.s3.us-west-1.amazonaws.com/favicon.ico"
          alt="Ícono de carga"
          class="spinner-icon"
        />
        <div class="spinner-text">Cargando...</div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
  imports: [CommonModule],
})
export class SpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.spinnerState$;
  }
}
