import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

}
