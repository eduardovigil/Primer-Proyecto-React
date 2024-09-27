import bcrypto from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(405).json({message: 'Metodo invalido'});
    }
    const {username, password, name} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'El email y la contraseña es requerido'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        return res.status(201).json({message: 'Usuario creado', user});

    } catch (error) {
        return res.status(500).json({message: 'Error', error});
    }
}