import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../../../../auth/services/usuario.service';
import { Usuario } from '../../../../../shared/models/usuarios.interface';
import { Rol } from '../../../../../shared/models/roles.interface';


enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<any>();
  titleButton = "Guardar";
  actionTODO = Action.NEW;
  roles: Rol[] = [];
  userForm = this.fb.group({
    cveUsuario : [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    cveRol: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private usuarioSvc: UsuariosService,
              private dialogRef: MatDialogRef<UsuarioDialogComponent>,
              public baseForm: BaseForm ) { }

  ngOnInit(): void {
    this.usuarioSvc.listarRoles()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (roles: Rol[]) => {
      this.roles = roles;
      this.pathData();
    });    
  }

  pathData() {
    
    if (this.data.user.cveUsuario) {


      this.userForm.patchValue({
        cveUsuario: this.data?.user.cveUsuario,
        nombre: this.data?.user.nombre,
        apellidos: this.data?.user.apellidos,
        username: this.data?.user.username,
        cveRol: this.data?.user.cveRol,
      });

      this.userForm.get("username")?.disable();

      // Eliminar las validaciones password, confirmPassword
      this.userForm.get("password")?.setValidators(null);
      this.userForm.get("password")?.setErrors(null);
      this.userForm.get("confirmPassword")?.setValidators(null);
      this.userForm.get("confirmPassword")?.setErrors(null);

      this.userForm.updateValueAndValidity();

      this.titleButton = "Actualizar";
      this.actionTODO = Action.EDIT;
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
}

//creamos carpeta service: ng g s pages/auth/services/auth
// ng g environments 

onSave() {
  if (this.userForm.invalid) return;

  var formValue = this.userForm.getRawValue();

  if (this.actionTODO == Action.NEW) {
    // Insert
    var newUser: Usuario = {
      nombre: formValue.nombre!,
      apellidos: formValue.apellidos!,
      username: formValue.username!,
      password: formValue.password!,
      cveRol: parseInt(formValue.cveRol!)
    };
    this.usuarioSvc.insertarUsuario(newUser)
      .pipe(takeUntil(this.destroy$)).subscribe((data: Usuario) => {
        this.dialogRef.close(data);
      });
  } else {
    // Actualización
    var updateUser: Usuario = {
      cveUsuario: parseInt(formValue.cveUsuario!),
      nombre: formValue.nombre!,
      apellidos: formValue.apellidos!,
      cveRol: parseInt(formValue.cveRol!)
    };
    this.usuarioSvc.actualizarUsuario(updateUser)
      .pipe(takeUntil(this.destroy$)).subscribe((data: Usuario) => {
        this.dialogRef.close(data);
      });
  }
}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
