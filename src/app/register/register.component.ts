import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../services/auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
 
  constructor(private userService: UserService, private enrutador: Router){}

  onSubmit(){
    this.registrar();
  }
  registrar(){
    this.userService.registerUser(this.user).subscribe({
      next: (data) => {
        this.enrutador.navigate(['/inicio']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  irInicarSesion(){
    this.enrutador.navigate(['/iniciar-sesion'])
  }
}
