import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptionDecryptionService } from '../../services/common/encryptionDecryption/encryption-decryption.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private encryptionDecryptionService: EncryptionDecryptionService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobilenumber: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      alert("Please Enter Valid Info")
      return;
    }
    let obj = {
      "mobileno": this.encryptionDecryptionService.encrypt(this.loginForm?.value.mobilenumber),
      "password": this.encryptionDecryptionService.encrypt(this.loginForm?.value.password),
      "clientid": this.encryptionDecryptionService.encrypt("GRP24040106370616168091")
    }
    this.http.post('https://dev-ris-backend.epravaha.com/api/login/user', obj)
      .subscribe(
        (res: any) => {
          if (res?.token) {
            localStorage.setItem('token', res?.token)
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          // alert(error?.error?.message)
          console.error('Login failed', error);
        }
      );

  }


}