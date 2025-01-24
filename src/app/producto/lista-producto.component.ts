import { Component, OnInit } from '@angular/core';
import { ArticuloService } from './producto.service';
import { Producto } from '../model/producto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import {ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  standalone: true,
  styleUrls: ['./lista-producto.component.css'],
  imports: [HttpClientModule,RouterModule,CommonModule], // Importa RouterModule aquí
})
export class ListaProductoComponent implements OnInit {

  articulos: Producto[] = [];

  constructor(private articuloService: ArticuloService, private cartService: CartService ,private toastrService: ToastrService) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.articuloService.lista().subscribe(
      data => {
        this.articulos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addToCart(product: Producto): void {
    this.cartService.addToCart({ id: product.id, name: product.nombre, price: product.precioFinal, image: product.imagen, quantity: 1 });
    this.toastrService.success
    ('', 'Producto Agregado', {positionClass: 'toast-top-center', timeOut: 3000});
  }

  verDetalle(productId: number): void {
    console.log(`Navegando al detalle del producto con ID: ${productId}`);
  }

}
