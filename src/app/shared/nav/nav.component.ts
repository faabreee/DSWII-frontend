import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { LoginService } from 'src/app/services/auth/login.service';
import { DialogoConfirmacionLogoutComponent } from 'src/app/components/dialogo-confirmacion-logout/dialogo-confirmacion-logout.component';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  user?: User;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog // Inyecta el servicio MatDialog
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
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
}