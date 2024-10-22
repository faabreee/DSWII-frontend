import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarProductoModalComponent } from 'src/app/eliminar-producto-modal/eliminar-producto-modal.component'; // Asegúrate de importar el componente modal


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {

  name: String = "";
  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService,private router: Router, private modalService: NgbModal){}

  ngOnInit(){
    this.listar();
  }
listar(){
  this.proveedorService.listar().subscribe(data =>{
    this.proveedores = data;
  });
}

  irRegistrarProveedor(){
    this.router.navigate(['proveedor/crear'])
  }
  irEditarProveedor(id: number){
    this.router.navigate(['/editar',id])
  }

  buscarProveedor(name: String) {
    this.proveedorService.buscar(name).subscribe(data =>{
      this.proveedores = data;
    });
  }
  
  eliminar(id: number) {
    const modalRef = this.modalService.open(EliminarProductoModalComponent);
    modalRef.componentInstance.productoId = id;

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.proveedorService.eliminar(id).subscribe({
          next: () => {
            this.listar(); 
          },
          error: (error) => {
            console.error('Error al eliminar el proveedor', error);
            alert('Error al eliminar el proveedor');
          }
        });
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

  irDetalle(id: number){
    this.router.navigate(['proveedor/detalle',id])
  }

  irInicio(){
    this.router.navigate(['inicio'])
  }
 
}

