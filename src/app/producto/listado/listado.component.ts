import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarProductoModalComponent } from 'src/app/eliminar-producto-modal/eliminar-producto-modal.component'; // Asegúrate de importar el componente modal


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  productos: Producto[] = [];
  nomPro: String = "";
  productoIdToDelete: number | null = null;

  constructor(private productoService: ProductoService,private router: Router, private route: ActivatedRoute, private modalService: NgbModal) {
  }

  ngOnInit(){
    this.listarProducto();
  }

  listarProducto() {
    this.productoService.listar().subscribe(data =>{
      this.productos = data;
    });
  }

  registrarProducto(){
    this.router.navigate(['producto/registrar'])
  }

  editarProducto(id: number){
    console.log(id);
    this.router.navigate(['producto/editar',id])
  }

  
  buscarProducto(name: String) {
    this.productoService.buscar(name).subscribe(data =>{
      this.productos = data;
    });
  }
  
  
  eliminarProducto(id: number) {
    // Abre el modal y pasa el ID del producto a eliminar
    const modalRef = this.modalService.open(EliminarProductoModalComponent);
    modalRef.componentInstance.productoId = id; // Pasa el ID al modal
  
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        // Llama al servicio para eliminar el producto solo si el usuario confirma
        this.productoService.eliminar(id).subscribe({
          next: () => {
            this.listarProducto(); // Refresca la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar el producto', error);
            alert('Error al eliminar el producto');
          }
        });
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

/*
eliminarProducto(id: number) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productoService.eliminar(id).subscribe(data =>{
        this.listarProducto();
      console.log('Producto eliminado con éxito');
        },
        error: (error) => {
          console.error('Error al eliminar el producto', error);
          alert('No se pudo eliminar el producto'); 
        }
      
      
      });
    }
  */
    detalleProducto(id: number) {
      this.router.navigate(['producto/detalle',id])
    }
  
    regresar() {
      this.router.navigate(['inicio'])
    }
   
  }