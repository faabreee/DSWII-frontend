import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Solicitud } from 'src/app/services/solicitud/solicitud';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class SolicitudListaComponent {

  solicitudes: Solicitud[] =[];

  constructor(private solicitudService: SolicitudService,private router: Router){}
 
  ngOnInit(){
    this.listar();
  }

  listar(){
    this.solicitudService.listar().subscribe(data =>{
      this.solicitudes= data;
    });
  }

  irRegistroSolicitud(){
    this.router.navigate(['solicitud/crear']);
  }
  
  irInicio(){
    this.router.navigate(['inicio'])
  }

}
