import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import {ToastrService } from 'ngx-toastr';
import { PaymentComponent } from '../payment/payment.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports: [PaymentComponent,CommonModule,RouterModule,   FormsModule], // Importa RouterModule aquí
  
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  total = 0;

  constructor(private cartService: CartService ,private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.getTotal();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);

  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);

  }
  
  addItem(item: any) {
    this.cartService.addToCart(item);
    this.cartItems = this.cartService.getCart(); // Actualiza la vista

  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCart(); // Actualiza la vista
  }
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getObtenerProductos() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}