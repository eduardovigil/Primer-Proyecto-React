import { prisma } from "../../../libs/db";
import { verifytoken } from "../../../libs/auth";

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const tarea = await prisma.task.findMany({
                where: {
                    proyect_id: Number(req.query.proyect_id)
                }
            });
            res.json(tarea);
        } catch (error) {
            res.status(500).json({ message: 'Error de Servidor'});
        }
    }else if(req.method === 'POST'){
        const { name, proyect_id } = req.body;
        try {
            const user = verifytoken(req);
            const tarea = await prisma.task.create({
                data: {
                    name: name,
                    proyect_id: Number(proyect_id),
                },
            });
            res.json(tarea);
        } catch (error) {
            res.status(500).json({ message: 'Error de Servidor'});
        }
    }else{
        res.status(405).json({ message: ' metodo incorrecto'});
    }
}