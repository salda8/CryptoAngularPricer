import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<User[]>("/api/users");
  }

  public getById(id: number) {
    return this.http.get("/api/users/" + id);
  }

  public create(user: User) {
    return this.http.post("/api/users", user);
  }

  public update(user: User) {
    return this.http.put("/api/users/" + user.id, user);
  }

  public delete(id: number) {
    return this.http.delete("/api/users/" + id);
  }
}
