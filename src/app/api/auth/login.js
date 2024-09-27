import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = 'your-secret-key-here'; // replace with your secret key

export default async function handler(req, res) {
    if( req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Email y Contraseña son requeridos' });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        }); 
        if (!user){
            return res.status(401).json({ message: 'Usuario no encontrado'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if( !isPasswordValid ){
            return res.status(401).json({ message: 'Contraseña invalida' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            { expiresIn: '1h '}
        );

        return res.status(200).json({ message: 'Bienvenido a la pagina', token });
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal', error });
    }
}