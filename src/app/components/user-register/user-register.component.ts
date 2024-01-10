import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


export const fnpasswordsIguales: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {

  const pass1Control = control.get('password');
  const pass2Control = control.get('password2');

  if ((pass1Control != null || pass2Control) && pass1Control.value !== pass2Control.value) {
    pass2Control.setErrors({
      contrasenasIguales: false,
      msg: 'Contraseñas no son iguales'
    })
  }

  return ((pass1Control != null || pass2Control) && pass1Control.value !== pass2Control.value) ? {
    contrasenasIguales: 'no es correcto',
    msg: 'Revisar validacion de contraseñas'

  } : null;
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {


  // registerForm: FormGroup;
  hide = true;

  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
      password2: new FormControl('', [Validators.required]),
    }, {
    validators: fnpasswordsIguales
  });


  dataUsers;
  dataSource;
  displayedColumns;




  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
  }


  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      console.log("form no is correct");
    } else {
      this.usersService.createUser(this.registerForm.value).subscribe({
        next: (res) => {
          Swal.fire('Usuario Creado', 'Espere correo de confirmación', 'success')
        },
        error: (err) => {
          console.warn(err.error.msg)
          Swal.fire('Error', err.error.msg, 'error')
        }
      });
    }
  }


  fielNoValid(campo: string): boolean {


    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordNoValid() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }




}
