import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion-logout',
  templateUrl: './dialogo-confirmacion-logout.component.html',
  styleUrls: ['./dialogo-confirmacion-logout.component.css']
})
export class DialogoConfirmacionLogoutComponent {
  constructor(private dialogRef: MatDialogRef<DialogoConfirmacionLogoutComponent>) {}

  cancelar(): void {  
    this.dialogRef.close(false); 
  }

  confirmar(): void {  
    this.dialogRef.close(true); 
  }
}