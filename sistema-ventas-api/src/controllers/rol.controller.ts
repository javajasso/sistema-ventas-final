import { Request, Response } from "express";
import prisma from "../database/database";

class RolesController {

  public async listarRoles(req: Request, res: Response) {
    try {
        const roles = await prisma.rol.findMany({
            where: {
                activo: true
            },
            orderBy: {
                descripcion: 'asc'
            }
        });

        return res.json(roles);
    } catch (error: any) {
        return res.status(500).json({ message : `${error.message}` });
    }
}
}

export const rolesController = new RolesController();