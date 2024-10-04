import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../libs/db';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password, rol } = body;
    
        if(!email || !password ){
            return NextResponse.json({
                message: 'Ingrese email y contraseña'
            }, {
                status: 400
            });
        }
        const userFind = await prisma.user.findUnique({ where: { email }});
        if(userFind){
            return NextResponse.json({
                message: 'El usuario ya existe'
            },{
                status: 400
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedpassword,
                rol
            },
        });
        
        const {  ...user} = newUser;
        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },{
            status: 500
        });
    }

}