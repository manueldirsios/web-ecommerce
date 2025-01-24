import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private readonly baseUrl: string = environment.baseApiUrl;


  articuloURL = this.baseUrl+'/ordenes/';
  facturaURL = this.baseUrl+'/facturas/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<any[]> {
    return this.httpClient.get<any>(this.articuloURL + 'lista', cabecera);
  }

  facturar(idEmpresa:number, idPago:number):any{
    return this.httpClient.get(this.facturaURL+"generar/"+idEmpresa+"/"+idPago)
  
  }


  reimprimirFactura(idFactura:number):any{
    return this.httpClient.get(this.facturaURL+"pdf/"+idFactura)
  
  }


}
