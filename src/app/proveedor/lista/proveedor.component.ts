import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {

  name: String = "";
  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService,private router: Router){}

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
  
  eliminar(id: number){
    this.proveedorService.eliminar(id).subscribe(data =>{
      this.listar();
  });
}
  irDetalle(id: number){
    this.router.navigate(['proveedor/detalle',id])
  }

  irInicio(){
    this.router.navigate(['inicio'])
  }
 
}

