import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoConfirmacionLogoutComponent } from 'src/app/components/dialogo-confirmacion-logout/dialogo-confirmacion-logout.component';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn:boolean=false;
  user?:User;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog // Inyecta el servicio MatDialog
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  logout(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionLogoutComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // Si el usuario confirma
        this.loginService.logout();
        this.router.navigate(['iniciar-sesion']);
      }
    });
    
  }


  ngAfterViewInit(): void {
    // Este código se ejecutará después de que la vista esté completamente cargada
    const modal = document.getElementById('fondo-dialogo');
    const dialogo = document.querySelector('.dialogo') as HTMLElement;
    const btn = document.getElementById('abrirDialogo');
    const span = document.getElementById('close');

    if (btn) {
      btn.onclick = function() {
        if (modal) modal.style.display = 'flex';
      }
    }

    if (span) {
      span.onclick = function() {
        if (dialogo) {
          dialogo.style.animation = 'scale-out 0.2s forwards';
          setTimeout(function() {
            if (modal) modal.style.display = 'none';
            dialogo.style.animation = '';
          }, 100);
        }
      }
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        if (dialogo) {
          dialogo.style.animation = 'scale-out 0.2s forwards';
          setTimeout(function() {
            if (modal) modal.style.display = 'none';
            dialogo.style.animation = '';
          }, 100);
        }
      }
    }
  }

}
