import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-producto-modal',
  templateUrl: './eliminar-producto-modal.component.html',
  styleUrls: ['./eliminar-producto-modal.component.css']
})
export class EliminarProductoModalComponent {
  @Input() productoId: number | null = null;

  constructor(public activeModal: NgbActiveModal) { }

  confirmar() {
    this.activeModal.close('confirm'); 
  }

  cancelar() {
    this.activeModal.dismiss(); 
  }
}