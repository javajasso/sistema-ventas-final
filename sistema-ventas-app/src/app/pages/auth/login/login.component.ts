import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../../../shared/utils/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hide = true;
  private destroy$ = new Subject<any>();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private authSvc: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {}

  onLogin(){
    //TODO: Verificar que el formulario sea correcto
    if(this.loginForm.invalid) return;

    //Mostrar el spinner
    //this.spinner.show();

    //Obtener la información del formulario y almacenarla en una variable llamada 'form'
    const form = this.loginForm.value;
    console.log('Data', form);

    //creamos carpeta service: ng g s pages/auth/services/auth
    // ng g environments 

    //TODO: Ejecutar el servicio para obtener los datos
    this.authSvc.login(form).pipe(takeUntil(this.destroy$)).subscribe();
    
    
  }
  ngOnDestroy(): void {
    console.log("METHOD::OnDestroy")
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
