import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;
  showMessage: boolean = true;

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    phone:['',Validators.required]
  })

  ngOnInit(): void {
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService, private router: Router){
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.phone.setValue( userData.phone);
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
    
  }

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get phone()
  {
    return this.registerForm.controls.phone;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
          console.log("Actualizado Correctamente"); 
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }
  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}