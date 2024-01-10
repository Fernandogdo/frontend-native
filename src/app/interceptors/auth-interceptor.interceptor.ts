import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Global } from '../services/global/global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

    public url: string


    constructor(
        private router: Router

    ) {
        this.url = Global.url;

    }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = localStorage.getItem('token')

        const login = '/login';


        let reqClone;

        if (token) {
            if (!request.url.includes(login)) {

                reqClone = request.clone({
                    setHeaders: {
                        'x-token': token
                    }
                });
            }

        } else {
            reqClone = request
        }


        return next.handle(reqClone)
            .pipe(
                catchError(this.manageError)
            )
    }


    manageError(error: HttpErrorResponse) {

        Swal.fire('Error', 'No tiene los permisos para acceder', 'error')

        this.router.navigateByUrl('/login')


        return throwError(() => ("Error en Interceptor"))
    }
}