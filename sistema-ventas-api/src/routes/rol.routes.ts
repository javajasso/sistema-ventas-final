import { Router } from "express";
import { jwtCheck } from "../middlewares/jwt.check";
import { rolesController } from "../controllers/rol.controller";

class RolesRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        this.router.get('/roles', [jwtCheck], rolesController.listarRoles);
    }
}


const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;