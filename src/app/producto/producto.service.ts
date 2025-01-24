import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { environment } from '../../environments/environment';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private readonly baseUrl: string = environment.baseApiUrl;
  articuloURL = this.baseUrl+'/producto/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.articuloURL + 'lista', cabecera);
  }

  public detalle(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.articuloURL + `detalle/${id}`, cabecera);
  }
}
