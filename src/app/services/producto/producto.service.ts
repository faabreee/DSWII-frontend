import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../proveedor/proveedor';
import { ProveedorService } from '../proveedor/proveedor.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  proveedores: Proveedor[] = [];
  private baseUrl = 'http://localhost:8081/api/producto';

  constructor(private http: HttpClient, private proveedorService: ProveedorService) { }

  public listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(environment.urlHost+"auth/producto/listado");
  }
  //public eliminar(id: number):Observable<any>{
  //return this.http.delete(this.baseUrl + `/${id}`);
  //}
  public obtenerProducto(id: number): Observable<Producto>{
    return  this.http.get<Producto>(environment.urlHost+"auth/producto"+ `/${id}`);
  }
  public registrar(producto: Producto): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/producto/registrar",producto);
  }
  public buscar(name: String): Observable<Producto[]>{
    return  this.http.get<Producto[]>(environment.urlHost+"auth/producto/buscar" + `?name=${name}`);
  }
  public editar(id: number, producto: Producto):Observable<any>{
    return this.http.put(environment.urlHost+"auth/producto" + `/${id}`,producto)
  }
}
