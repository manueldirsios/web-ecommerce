import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentIntentDto } from '../model/payment-intent-dto';
import { environment } from '../../environments/environment';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})


export class PaymentService {
  private readonly baseUrl: string = environment.baseApiUrl;

  stripeURL = this.baseUrl+'/ordenes/';

  constructor(private httpClient: HttpClient) {}

  public pagar(paymentIntentDto: PaymentIntentDto,token:string): Observable<string> {
    const cabecera = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Stripe-Token': token // Agrega el token en los headers
      })
    };
    return this.httpClient.post<string>(this.stripeURL + 'paymentintent', paymentIntentDto, cabecera);
  }

  public confirmar(idPago:number,idRef: string,token:string): Observable<string> {
    const cabecera = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Stripe-Token': token // Agrega el token en los headers
      })
    };
    return this.httpClient.post<string>(this.stripeURL + `confirm/${idPago}/${idRef}`, {}, cabecera);
  }

  public cancelar(idPago:number,idRef: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `cancel/${idPago}/${idRef}`, {}, cabecera);
  }

}
