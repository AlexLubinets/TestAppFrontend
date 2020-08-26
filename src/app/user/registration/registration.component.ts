import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
 public form: any;
 
  constructor(public service: AuthService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName : ['', [Validators.required, Validators.maxLength(255)]],
      fullName : ['', [Validators.required, Validators.maxLength(255)]],
      passwords : this.fb.group({
        password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
        confirmPassword : ['', Validators.required]
      }, {validators: this._comparePasswords})
    });
  }

  private _comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('confirmPassword');
    if ( confirmPswrdCtrl.errors === null || confirmPswrdCtrl.errors.passwordMismatch) {
      if (fb.get('password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true});
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  onSubmit() {
    let body = {
      userName: this.form.value.userName,
      fullName: this.form.value.fullName,
      password: this.form.value.passwords.password
    };

    this.service.register(body).subscribe (
      (res: any) => {
        if (res.succeeded) {
          this.form.reset();
          this.toastr.success('New user has been created!', 'Registration successful.');
          this.router.navigateByUrl('/user/login');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error(`Username '${body.userName}' is already taken.`, 'Registration failed.');
                break;
              default:
                this.toastr.error(element.description, 'Registration failed.');
                break;

            }
          });
        }
      },
      err => {
        this.toastr.error(err.error);
      }
    );
  }
}
