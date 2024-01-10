import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../interfaces/User";
import { Global } from '../global/global';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';
// UserModel

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  public url: string;
  public user: UserModel;
  roleUser;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.url = Global.url;
  }



  tokenValidat(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(this.url + 'renew', {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((res: any) => {
        this.roleUser = res.user.role;

        const { name, email, role, uid } = res.user
        this.user = new UserModel(role, name, email, uid)

        // this.user.printUser();
        localStorage.setItem('token', res.token)

        return true;
      }),
      catchError(error => of(false))
    )
  }

  createUser(User: User) {
    return this.http.post(this.url + 'Users', User)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );
  }


  getUsers() {
    return this.http.get<User[]>(this.url + 'users');
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.url}Users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}Users/${id}`);
  }

  updateUser(user: User) {
    let idUser = user.uid
    return this.http.put(`${this.url}Users/${idUser}`, user);
  }


  login(formData: User) {
    return this.http.post(this.url + 'login', formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )

  }



  logOut() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
