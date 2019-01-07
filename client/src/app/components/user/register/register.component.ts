import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Location } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  private user: UserInterface = {
    name: "",
    email: "",
    password: ""
  }

  public isError = false;
  public msgError = '';

  ngOnInit() {
  }
  // Void: no retorna nada
  onRegister(form: NgForm): void {
    if(form.valid){
      this.authService.registerUser(
        this.user.name, 
        this.user.email, 
        this.user.password
        ).subscribe(user => { 
          this.authService.setUser(user);
          let token = user.id;
          this.authService.setToken(token);
          this.router.navigate(['/user/profile']);
          location.reload();
        },
        res => {
          this.onIsError()
          this.msgError = res.error.error.details.messages.email[0];
        }
        );
    } else {
      this.onIsError();
    }
    
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 3000);
  }

}
