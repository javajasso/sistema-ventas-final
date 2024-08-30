"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_check_1 = require("../middlewares/jwt.check");
const rol_controller_1 = require("../controllers/rol.controller");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/roles', [jwt_check_1.jwtCheck], rol_controller_1.rolesController.listarRoles);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
