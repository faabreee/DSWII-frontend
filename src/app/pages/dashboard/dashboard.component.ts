import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.userLoginOn = true; // Establece el estado si el token existe
    }
  
    // Suscripción al estado del usuario logueado
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }
  

}