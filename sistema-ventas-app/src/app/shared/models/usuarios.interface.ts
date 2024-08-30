import { Rol } from "./roles.interface";

export interface Usuario {
    cveUsuario?: number;
    nombre: String;
    apellidos: String;
    username?: String;
    password?: String;
    fechaRegistro?: Date;
    cveRol?: number;
    rol?: Rol

}