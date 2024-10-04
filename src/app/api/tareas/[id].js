import { prisma } from "../../../libs/db";
import { verifytoken } from "../../../libs/auth";

 export default async function handler(req, res) {
    const {id} = req.query;
    try {
        const user = verifytoken(req);
        if(req.method === 'GET'){
            try {
                const task = await prisma.task.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
                if(!task){
                    return res.status(404).json({message: "Task not found"});
                }
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({message: "Error fetching task"});
            }
        }else if(req.method === 'PUT'){
            const { name } = req.body;
            try {
                const task = await prisma.task.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
                if(!task){
                    return res.status(404).json({message: "Task not found"});
                }
                const updatedTask = await prisma.task.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        name: name
                    }
                });
                return res.status(200).json(updatedTask);
            } catch (error) {
                return res.status(500).json({message: "Error updating task"});
            }
        }else if(req.method === 'DELETE'){
            try {
                const task = await prisma.task.findUnique({
                    where: {
                        id: id
                    }
                });
                if(!task){
                    return res.status(404).json({message: "Task not found"});
                }
                await prisma.task.delete({
                    where: {
                        id: Number(id),
                    }
                });
                return res.status(200).json({message: "Task deleted"});
            } catch (error) {
                return res.status(500).json({message: "Error deleting task"});
            }
        }else {
            return res.status(405).json({message: "Method not allowed"});
        }
    } catch (error) {
        return res.status(500).json({message: "No autorizado"});
    }
 }