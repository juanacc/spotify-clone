import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  sessionError: boolean = false;

  constructor(private authService: AuthService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('test@test.com', [Validators.required, Validators.email]),
        password: new FormControl('12345678', [Validators.required, Validators.minLength(6)])
      }
    )
  }

  sendLogin(){
    const {email, password} = this.formLogin.value;
    this.authService.sendCredentials(email, password).subscribe(resp => {
      console.log('Ok login');
    }, err => {
      this.sessionError = true;
      console.log('Error login');
    })
  }

}
