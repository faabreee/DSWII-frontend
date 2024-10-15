import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl = "http://localhost:8081/auth"
  constructor(private http: HttpClient) { }

  public listar(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(environment.urlHost+"auth/proveedor/listado");
  }
  public registrar(proveedor: Proveedor): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/proveedor/registrar",proveedor);
  }
  public editar(id: number, proveedor: Proveedor):Observable<any>{
    return this.http.put(environment.urlHost+"auth/proveedor"+`/${id}`,proveedor)
  }
  public obtener(id: number): Observable<Proveedor>{
    return  this.http.get<Proveedor>(environment.urlHost+"auth/proveedor" + `/${id}`);
  }
  public buscar(name: String): Observable<Proveedor[]>{
    return  this.http.get<Proveedor[]>(environment.urlHost+"auth/proveedor/buscar"+ `?name=${name}`);
  }
  public eliminar(id: number):Observable<any>{
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  //llamar proveedor a productos
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(environment.urlHost+"auth/proveedor/listado");
  }
}
