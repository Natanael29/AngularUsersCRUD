import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

const USERS: User[] = [
  {
    id: 1,
    name: "Natanael",
    surname: "Martinez",
    email: "natanael29032000@gmail.com"
  },
  {
    id: 2,
    name: "Diego",
    surname: "Cedres",
    email: "diego06@gmail.com"
  },
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  columns: string[] = ["id", "name", "surname", "email", "actions"];
  dataSource = USERS;
  update: Boolean = false;

  userID: number = 0;
  inputName: string = "";
  inputSurname: string = "";
  inputEmail: string = "";
  idCount: number = this.dataSource[this.dataSource.length - 1].id + 1;

  constructor(private changeDetectorRefs: ChangeDetectorRef ) { }
  

  ngOnInit(): void {
  }

  createUser() {
    let newUser: User = {
      id: this.idCount,
      name: this.inputName,
      surname: this.inputSurname,
      email: this.inputEmail
    }
    this.dataSource = this.dataSource.concat(newUser);
  }

  updateInputs(user: User) {
    this.update = true;
    this.userID = user.id;
    this.inputName = user.name;
    this.inputSurname = user.surname;
    this.inputEmail = user.email;
  }

  updateUser() {
    let prevUser = this.dataSource.find((user) => user.id === this.userID)!;
    prevUser.name = this.inputName;
    prevUser.surname = this.inputSurname;
    prevUser.email = this.inputEmail;

    this.clearInputs()
  }

  deleteUser(id: number) {
    this.dataSource = this.dataSource.filter((user) => user.id != id)
  }

  clearInputs() {
    this.update = false
    this.inputName = "";
    this.inputSurname = "";
    this.inputEmail = "";
  }
}