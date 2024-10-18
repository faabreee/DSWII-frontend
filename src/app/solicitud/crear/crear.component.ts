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
  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;
  
  producto: Producto = {
    id: 0,
    nomPro: "",
    objProveedor: {
      id: 0,
      ruc: "",
      nomProvee: "",
      email: "",
      telefono: "",
      direccion: ""
    }
  };
  
  name: string = ""; 
  
  nuevaSolicitud: Solicitud = {
    id: 0,
    idPro: 0,
    cantidad: 0,
    idProveedor: 0,
    correo: '',
    fecha: new Date(),
    descripcion: '',
  };

  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  registrarSolicitud() {
    this.modalService.open(this.confirmModal);
  }

  confirmarRegistro(modal: any) {
    this.nuevaSolicitud.idPro = this.producto.id;
    this.nuevaSolicitud.idProveedor = this.producto.objProveedor.id;
    this.nuevaSolicitud.correo = this.producto.objProveedor.email;

    this.solicitudService.registrar(this.nuevaSolicitud).subscribe(
      response => {
        console.log('Solicitud Registrada', response);
        modal.dismiss(); 

        this.router.navigate(['solicitud/lista']);
        
        this.resetForm();
      },
      error => {
        console.error('Error al registrar la solicitud', error);
        alert("Error al registrar la solicitud");
      }
    );
  }
  
  buscarProducto(name: string) {
    this.productoService.buscarProducto(name).subscribe(data => {
      if (data && data.length > 0) {
        this.producto = data[0];
      } else {
        alert('Producto no encontrado');
      }
    });
  }
  
  private resetForm() {
    this.nuevaSolicitud = {
      id: 0,
      idPro: 0,
      cantidad: 0,
      idProveedor: 0,
      correo: '',
      fecha: new Date(),
      descripcion: '',
    };

    this.name = '';
    this.producto = {
      id: 0,
      nomPro: '',
      objProveedor: {
        id: 0,
        ruc: '',
        nomProvee: '',
        email: '',
        telefono: '',
        direccion: ''
      }
    };
  }
}