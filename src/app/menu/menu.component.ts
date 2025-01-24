import { Component, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from './../cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule], // Importa RouterModule aquí
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit{
  constructor( private cartService: CartService ) { }
  carritoCantidad: number = 0;
  ngOnInit(): void {
   // Escucha cambios en la cantidad de productos
   this.cartService.cantidadProductos$.subscribe(cantidad => {
    this.carritoCantidad = cantidad;
  });
  }
  
}
