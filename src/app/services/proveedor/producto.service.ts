import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = "http://localhost:8081/api/producto"
  constructor(private http: HttpClient) { }

  public buscarProducto(name: String): Observable<Producto[]>{
    return this.http.get<Producto[]>(environment.urlHost+"auth/producto/buscar" + `?name=${name}`);
  }
  
}