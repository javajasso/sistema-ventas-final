import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller';
import { validate } from '../middlewares/validator.check';
import { insertRules, updateRules } from '../rules/usuario.rules';
import { jwtCheck } from '../middlewares/jwt.check';

class UsuarioRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/', [jwtCheck], usuariosController.listar);
        // insercion
        this.router.post('/', insertRules(), [validate], usuariosController.insertar);
        // actualizar
        this.router.put('/', updateRules(), [validate], usuariosController.actualizar);
        //eliminar
        this.router.delete('/:cveUsuario', usuariosController.eliminar);
    }

    
    // public router: Router;

    // constructor(){
    //     this.router = Router();
    //     this.config();
    // }
    // /**
    //  * 
    //  */
    
    // config(): void{
    //     /** 
    //      * @swagger
    //      * /api/usuarios:
    //      *  get:
    //      *      tags: ["Usuarios"]
    //      *      summary: Obtener todos los usuarios
    //      *      description: Ruta para obtener todos los usuarios
    //      *      produces:
    //      *          - application/json
    //      *      responses:
    //      *          200:
    //      *              description: Lista de usuarios
    //      *          500:
    //      *              description: Error en el servidor
    //      */
    //     this.router.get('/', [jwtCheck],usuariosController.getAllUsuarios);
    //    /** 
    //      * @swagger
    //      * /api/usuarios/{id}:
    //      *  post:
    //      *      tags: ["Usuarios"] 
    //      *      summary: Obtener usuario por ID
    //      *      description: Ruta para obtener un usuario por su ID
    //      *      parameters:
    //      *          - name: id
    //      *            in: path
    //      *            required: true
    //      *            description: ID del usuario
    //      *            schema:
    //      *              type: integer
    //      *      produces:
    //      *          - application/json
    //      *      responses:
    //      *          200:
    //      *              description: Usuario encontrado
    //      *          404:
    //      *              description: Usuario no encontrado
    //      *          500:
    //      *              description: Error en el servidor
    //      */
    //     this.router.post('/:id', usuariosController.getUsuarioById);
    //     /** 
    //      * @swagger
    //      * /api/usuarios:
    //      *  post:
    //      *      tags: ["Usuarios"]
    //      *      summary: Crear nuevo usuario
    //      *      description: Ruta para crear un nuevo usuario
    //      *      consumes:
    //      *          - application/json
    //      *      requestBody:
    //      *          required: true
    //      *          content:
    //      *              application/json:
    //      *                  schema:
    //      *                      type: object
    //      *                      properties:
    //      *                          nombre:
    //      *                              type: string
    //      *                          apellidos:
    //      *                              type: string
    //      *                          username:
    //      *                              type: string
    //      *                          email:
    //      *                              type: string
    //      *                          rol:
    //      *                              type: string
    //      *                          password:
    //      *                              type: string
    //      *      produces:
    //      *          - application/json
    //      *      responses:
    //      *          201:
    //      *              description: Usuario creado
    //      *          500:
    //      *              description: Usuario creado
    //      */
    //     this.router.post('/', usuariosController.createUsuario);
    //     /** 
    //      * @swagger
    //       * /api/usuarios/{id}:
    //      *  put:
    //      *      tags: ["Usuarios"]
    //      *      summary: Actualizar usuario
    //      *      description: Ruta para actualizar un usuario existente
    //      *      parameters:
    //      *          - name: id
    //      *            in: path
    //      *            required: true
    //      *            description: ID del usuario a actualizar
    //      *            schema:
    //      *              type: integer
    //      *      consumes:
    //      *          - application/json
    //      *      requestBody:
    //      *          required: true
    //      *          content:
    //      *              application/json:
    //      *                  schema:
    //      *                      type: object
    //      *                      properties:
    //      *                          nombre:
    //      *                              type: string
    //      *                          apellidos:
    //      *                              type: string
    //      *                          username:
    //      *                              type: string
    //      *                          email:
    //      *                              type: string
    //      *                          rol:
    //      *                              type: string
    //      *                          password:
    //      *                              type: string
    //      *      produces:
    //      *          - application/json
    //      *      responses:
    //      *          200:
    //      *              description: Usuario actualizado
    //      *          404:
    //      *              description: Usuario no encontrado
    //      *          500:
    //      *              description: Error en el servidor
    //      */
    //     this.router.put('/:id', usuariosController.updateUsuario);
    //     /** 
    //      * @swagger
    //      * /api/usuarios/{id}:
    //      *  delete:
    //      *      tags: ["Usuarios"]
    //      *      summary: Eliminar usuario
    //      *      description: Ruta para eliminar un usuario
    //      *      parameters:
    //      *          - name: id
    //      *            in: path
    //      *            required: true
    //      *            description: ID del usuario a eliminar
    //      *            schema:
    //      *              type: integer
    //      *      produces:
    //      *          - application/json
    //      *      responses:
    //      *          200:
    //      *              description: Usuario eliminado
    //      *          404:
    //      *              description: Usuario no encontrado
    //      *          500:
    //      *              description: Error en el servidor
    //      */
    //     this.router.delete('/:id', usuariosController.deleteUsuario);
    // }
}



const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;