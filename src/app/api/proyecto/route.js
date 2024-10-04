import { prisma } from '../../../../libs/db';
import { verifytoken } from  '../../../libs/auth';

export default async function handler(req, res) {
    const decoded = verifytoken(req,res);
     if(!decoded) return;

     if(req.method === 'GET'){
        try {
            const proyect = await prisma.proyect.findMany({
                where: {
                    user_id: decoded.id
                },
                include: {
                    task: true
                }
            });
            return res.status(200).json(proyect);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los proyectos' });
        }
     }else if(req.method === 'POST'){
        const { name } = req.body;
        try {
            const proyect = await prisma.proyect.create({
                data: {
                    name,
                    user_id: decoded.id
                }
            });
            return res.status(201).json(proyect);
     }catch(error){
        return res.status(500).json({ message: 'Error al crear el proyecto' });
    }
    }else{
        return res.status(405).json({ message: 'Método no permitido' });
    }
}