import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from './payment.service';
import { Router } from '@angular/router';
import { PaymentIntentDto } from '../model/payment-intent-dto';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoPago } from '../model/productoPago';
import { CartService } from '../cart/cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule,// Importa el componente ,Importa CommonModule para usar *ngIf
  ReactiveFormsModule, // Necesario para formGroup
  FormsModule ,         // Necesario para ngSubmit
  ]
})
export class PaymentComponent implements OnInit {
  @Input() precio: number;
  private readonly publicKeyStripe: string = environment.publicKeyStripe;

  descriptions:string='';
  listArticulos:Array<ProductoPago>=new Array;

  cardError: string | null = null; // Para almacenar errores de la tarjeta
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  cartItems: any[] = [];

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    public modalService: NgbModal,
    private paymentService: PaymentService,
    private router: Router,
    private cartService: CartService
  ) {}


  async ngOnInit() {
  this.cargarProducto();

    // Cargar Stripe con tu clave pública
    this.stripe = await loadStripe(this.publicKeyStripe);
    if (this.stripe) {
      this.elements = this.stripe.elements({
        locale: 'es' // Configuración de idioma
      });

      if (this.elements) {
        // Crear el elemento de tarjeta
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            },
            invalid: {
              color: '#fa755a', // Color rojo para errores
              iconColor: '#fa755a',
            }
          }
        });

        // Montar el elemento de tarjeta en el DOM
        if (this.card) {
          this.card.mount('#card-element');
        }
       // Escuchar errores en el campo
      this.card.on('change', (event) => {
        if (event.error) {
          this.cardError = event.error.message;
        } else {
          this.cardError = null; // Limpia el error si no hay problemas
        }
      });
      }
    }
  }

  async buy() {
    if (this.stripe && this.card) {
      const name = this.stripeForm.get('name')?.value;
      // Crear un token de pago
      const { token, error } = await this.stripe.createToken(this.card, { name });
      if (!this.cardError) {
      
      
        const paymentIntentDto: PaymentIntentDto = {
          //token: token.id,
          amount: this.precio,
          currency: 'MXN',
          description: this.descriptions,
          listArticulos:this.listArticulos
        };

        // Enviar el token al backend
        this.paymentService.pagar(paymentIntentDto,token.id).subscribe(
          (data) => {
            this.abrirModal(data['idPago'],data['idPagoStripe'], data['descripcion'], data['monto'],token.id);
          },
          (err) => {
            this.cardError = 'Error al procesar el pago.';
            console.error(err);
            this.delayCleanForm(7000);
          }
        );

        this.cardError = null;
      } else if (error) {
        this.cardError = error.message;
      }
    }
  }

  cargarProducto(){
    this.cartItems = this.cartService.getCart();
    this.precio= this.getTotal();
    this.getProductsByPay();
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getProductsByPay() {
    this.descriptions = this.cartItems.map(item => item.name).join(', ');

    this.listArticulos = this.cartItems.map(item => ({
      id: item.id,
      cantidad: item.quantity
    }));

  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  abrirModal(idPago:number ,idPagoStripe: string, descripcion: string, precio: number, token: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.token=token;
    modalRef.componentInstance.idPago = idPago;
    modalRef.componentInstance.idPagoStripe = idPagoStripe;
    modalRef.componentInstance.totalProductos = this.getTotalItems();
    modalRef.componentInstance.descripcionProducto = descripcion;
    modalRef.componentInstance.precio = precio;
  }

  async delayCleanForm(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=> this.cardError = null);
}
}
