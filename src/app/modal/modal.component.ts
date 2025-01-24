import { Component , OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../payment/payment.service';
import {ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent  implements OnInit {
  @Input() idPago;
  @Input() totalProductos;
  @Input() token;
  @Input() idPagoStripe;
  @Input() descripcionProducto;
  @Input() precio;


  constructor(
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  confirmar(idPago:number,idPagoStripe: string): void {
    this.paymentService.confirmar(idPago,idPagoStripe,this.token).subscribe(
      data => {
        this.cartService.clearCart();
        this.toastrService.success
        ('pago confirmado', 'se ha confirmado el pago con id ' + data[`idPagoStripe`], {positionClass: 'toast-top-center', timeOut: 3000});
        this.activeModal.close();
        this.router.navigate(['/compras']); // Redirecciona a la ruta especificada
    
      },
      err => {
        console.log(err);
        //this.activeModal.close();
      }
    );
  }

  cancelar(idPago:number,idPagoStripe: string): void {
    this.paymentService.cancelar(idPago,idPagoStripe).subscribe(
      data => {
        this.cartService.clearCart();
        this.toastrService.success
        ('pago cancelado', 'se ha cancelado el pago con id ' + data[`idPagoStripe`], {positionClass: 'toast-top-center', timeOut: 3000});
        this.activeModal.close();
        this.router.navigate(['/compras']); // Redirecciona a la ruta especificada
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }
}
