import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { User } from '../core/models/User';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public users: User[];

  constructor(private lStorage : LocalStorageService, private router: Router, private dataService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initProducts();
  }

  public initProducts() {
      
      this.dataService.getUsers().subscribe(
      (res : HttpResponse<User[]>) => {
        this.users = res.body;
      },
      err => {
        if (err.status === 400) {
          this.toastr.error(err.error, 'Table download has failed');
        } else {
          console.log(err);
        }
      });
    }

    public onLogout() {
      this.lStorage.removeToken();
      this.router.navigate(['/user/login']);
    }
}