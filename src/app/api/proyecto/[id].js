import { prisma } from "../../../libs/db";
import { verifytoken } from "../../../libs/auth";

export default async function handler(req, res) {
    const { id } = req.query;
    if(req.method === 'GET'){
        try {
            const user = verifytoken(req);
            const project = await prisma.proyect.findFirst({
                where: {
                    id: Number(id),
                    userId: user.id
                },
                include: {
                    tasks: true
                }
            });
            if(!project){
                return res.status(404).json({ message: ' Proyecto no encontrao'});
            }
            return res.json(project);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el proyecto' });
        }
    }else if( req.method === 'PUT'){
        const { name } = req.body;
        try {
            const user = verifytoken(req);
            const project = await prisma.proyect.update({
                where: { id: Number(id), },
                data: {name}
            });
            return res.json(project);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el proyecto' });
        }
    }else if(req.method === 'DELETE'){
        try {
            const user = verifytoken(req);
            const project = await prisma.proyect.delete({
                where: { id: Number(id) }
            });
            return res.json(project);
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el proyecto' });
        }
    } else {
        return res.status(405).json({ message: 'Método no permitido' });
    }
}