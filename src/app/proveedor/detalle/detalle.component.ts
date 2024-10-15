import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class ProveedorDetalleComponent {

  proveedor: Proveedor  ={
    id: 0,
    ruc: '',
    nomProvee: '',
    email: '',
    telefono: '',
    direccion: '',

  }

  constructor(private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
    
  ){}

  ngOnInit(){
    this.obtenerProveedor();
  }

  obtenerProveedor(){
    const id = this.route.snapshot.params['id'];
    this.proveedorService.obtener(id).subscribe(
      response =>{this.proveedor = response},
    );
  }
  irAlistado(){
    this.router.navigate(['proveedor/lista'])
  }
}
