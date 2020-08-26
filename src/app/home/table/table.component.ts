import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from './../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/User';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  
  public users: User[];

  constructor(private dataService: UsersService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initUsers();
  }

  public initUsers() {    
    this.dataService.getUsers().subscribe(
      (res : HttpResponse<User[]>) => {
        this.users = res.body;
      },
      err => {
        console.log(err);
    });
  }

}
