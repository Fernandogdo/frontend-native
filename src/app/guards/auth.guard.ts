import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users/users.service';
import { tap } from 'rxjs/operators';
Router

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }
  canActivate(
    // route: ActivatedRouteSnapshot,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usersService.tokenValidat()
      .pipe(
        tap(isAunthenticated => {
          if (!isAunthenticated || this.usersService.roleUser !== 'ADMIN_ROLE') {
            this.router.navigateByUrl('/login')
            localStorage.removeItem('token')
          }
        })
      );
  }

}
