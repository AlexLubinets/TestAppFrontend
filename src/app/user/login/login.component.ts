import {ToastrService} from 'ngx-toastr';
import { AuthService} from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: any;

  constructor(public service: AuthService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName : ['', [Validators.required, Validators.maxLength(255)]],
      password : ['', [Validators.required, Validators.maxLength(255)]],
    });
  }
  
  onSubmit() {
    let body = {
      userName: this.form.value.userName,
      password: this.form.value.password
    };
  this.service.login(body).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    },
    err => {
      if (err.status === 401) {
        this.toastr.error(err.error, 'Authentication failed.');
      } else {
        console.log(err);
      }
    }
    );
  }
}