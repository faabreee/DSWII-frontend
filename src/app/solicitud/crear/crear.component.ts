import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/services/proveedor/producto';
import { ProductoService } from 'src/app/services/proveedor/producto.service';
import { Solicitud } from 'src/app/services/solicitud/solicitud';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class SolicitudCrearComponent {
  @ViewChild('successModal') successModal!: TemplateRef<any>; 
  producto: Producto ={
    id: 0,
    nomPro: "",
    objProveedor:{
      id: 0,
      ruc: "",
      nomProvee: "",
      email: "",
      telefono: "",
      direccion: ""
    }
  };
  name: String = "";
  nuevaSolicitud: Solicitud ={
    id: 0,
	 idPro: 0,
	 cantidad: 0,
	 idProveedor: 0,
	 correo: '',
	 fecha: new Date() ,
	 descripcion: '',
  }
  constructor(private solicitudService: SolicitudService,private productoService: ProductoService,
    private router: Router,private modalService: NgbModal
  ){}

  registrarSolicitud(){
    this.nuevaSolicitud.idPro = this.producto.id
    this.nuevaSolicitud.idProveedor = this.producto.objProveedor.id
    this.nuevaSolicitud.correo = this.producto.objProveedor.email
    this.solicitudService.registrar(this.nuevaSolicitud).
    subscribe(Response =>{
      console.log('Solicitud Registrado',Response);
      this.showSuccessDialog();
      this.nuevaSolicitud ={
        id: 0,
        idPro: 0,
        cantidad: 0,
        idProveedor: 0,
        correo: '',
        fecha: new Date() ,
        descripcion: '',
      };

      this.name = ""
      this.producto = {
        id: 0,
        nomPro: "",
        objProveedor:{
          id: 0,
          ruc: "",
          nomProvee: "",
          email: "",
          telefono: "",
          direccion: ""
        }
      }
      this.router.navigate(['solicitud/lista']);
    },
    error =>{
      console.error('Error al registrar el solicitud',error)
    }
    
  );
  }

  buscarProducto(name: String) {
    this.productoService.buscarProducto(name).subscribe(data =>{
      this.producto = data[0];
    });
  }

  showSuccessDialog(){
    this.modalService.open(this.successModal);
  }

}
