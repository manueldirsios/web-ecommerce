import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root' // Hace que el servicio sea singleton y esté disponible globalmente
})
export class CartService {
  private cart: any[] = [];
  private cantidadProductos = new BehaviorSubject<number>(0); // Inicializa con 0 productos
  cantidadProductos$ = this.cantidadProductos.asObservable(); // Exponemos como observable

  constructor() {
    // Carga el carrito desde localStorage si existe
    if (typeof localStorage !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cantidadProductos.next(this.getTotalItems());
    }
  }
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
          // Busca si el producto ya está en el carrito
  const existingProduct = this.cart.find(item => item.id === product.id);

  if (existingProduct) {
    // Si el producto ya existe, incrementa la cantidad
    existingProduct.quantity += product.quantity;
  } else {
    // Si no existe, agrega el producto al carrito
    this.cart.push(product);
  }
    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cantidadProductos.next(this.getTotalItems());
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  increaseQuantity(index: number) {
    this.cart[index].quantity++;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.saveCart();
    }
    
  }
}
