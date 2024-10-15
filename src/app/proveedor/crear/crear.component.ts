import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  @ViewChild('successModal') successModal!: TemplateRef<any>; 

  nuevoProveedor: Proveedor ={
    id: 0,
    ruc: '',
    nomProvee: '',
    email: '',
    telefono: '',
    direccion: '',

  }

  constructor(private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ){}

  ngOnInit(){
    this.obtenerProveedor();
  }

  obtenerProveedor(){
    const id = this.route.snapshot.params['id'];
    this.proveedorService.obtener(id).subscribe(
      response =>{this.nuevoProveedor = response},
    );
  }

    registrarProveedor(){
      this.proveedorService.registrar(this.nuevoProveedor).
      subscribe(Response =>{
        console.log('Se registro Correctamente',Response);
        this.showSuccessDialog();
        this.nuevoProveedor ={
          id: 0,
          ruc: '',
          nomProvee: '',
          email: '',
          telefono: '',
          direccion: '',
        };
        this.router.navigate(['/proveedor/lista']);
      },
      error =>{
        console.error('Error al registrar el proveedor',error)
      }
      
    );
    }
      
      irAlistado(){
    this.router.navigate(['proveedor/lista'])
  }

  showSuccessDialog() {
    this.modalService.open(this.successModal);
  }
  }


