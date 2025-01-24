import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { ArticuloService } from './producto.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CartService } from '../cart/cart.service';
import {ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: true,
  styleUrls: ['./detalle-producto.component.css'],
  imports: [PaymentComponent,CommonModule,RouterModule,FormsModule]// Importa el componente ,Importa CommonModule para usar *ngIf
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto;
  cantidad: number = 1;

  constructor(
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute, private cartService: CartService ,private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarArticulo();
  }

  cargarArticulo(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.articuloService.detalle(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  contador: number = 1; // Valor inicial del contador

  incrementar() {
    this.contador++; // Incrementar el valor
  }

  decrementar() {
    if (this.contador > 0) {
      this.contador--; // Decrementar el valor solo si es mayor que 0
    }
  }

  addToCart(product: Producto): void {
    this.cartService.addToCart({ id: product.id, name: product.nombre, price: product.precioFinal, image: product.imagen, quantity: 1 });
    this.toastrService.success
    ('', 'Producto Agregado', {positionClass: 'toast-top-center', timeOut: 3000});
  }

  redirectCar(product: Producto){
    this.addToCart(product);
    this.router.navigate(['/cart']); // Redirecciona a la ruta especificada
  }


}
