import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ListaProductoComponent } from './app/producto/lista-producto.component';
import { DetalleProductoComponent } from './app/producto/detalle-producto.component';
import { ComprasComponent } from './app/compras/compras.component';
import {provideHttpClient,withInterceptors} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CartComponent } from './app/cart/cart.component';
import { PaymentComponent } from './app/payment/payment.component';
import { spinnerInterceptor } from './app/spinner/spinner.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor])),
    provideHttpClient(),//NECESARIO PARA CONSUMIR SERVICIOS 
    provideRouter([
        {path: '', component: ListaProductoComponent},
        {path: 'lista', component: ListaProductoComponent},
        {path: 'cart', component: CartComponent},
        {path: 'compras', component: ComprasComponent},
        {path: 'pago', component: PaymentComponent},
        {path: 'detalle/:id', component: DetalleProductoComponent},
        {path: '**', redirectTo: 'lista', pathMatch: 'full'}
    ]),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ]
});
