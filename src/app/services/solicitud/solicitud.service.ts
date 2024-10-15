import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from './solicitud';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private baseUrl = "http://localhost:8081/api/solicitud"
  constructor(private http: HttpClient) { }

  public registrar(solicitud: Solicitud): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/solicitud", solicitud);
 
  }

  public listar(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(environment.urlHost+"auth/solicitud");
  }
}