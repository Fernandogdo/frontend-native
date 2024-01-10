import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  // loginForm: FormGroup;
  hide = true;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ["", Validators.required],
    remember: [false]
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  signIn() {
    this.usersService.login(this.loginForm.value).subscribe({
      next: (res) => {

        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
        } else{
          localStorage.removeItem('email')
        }

        this.router.navigateByUrl('/dashboard')
      } ,
      error: (err) =>  Swal.fire('Error al iniciar sesión', 'Revise sus credenciales', 'error')
    })
  }

  // resetForm() {
  //   this.loginForm.reset();
  // }

}
