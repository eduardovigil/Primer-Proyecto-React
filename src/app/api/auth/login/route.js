import { prisma } from "../../../../libs/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password){
        return NextResponse.json({
            error: 'Email y contraseña son requeridas'
        },{
            status: 400
        });
    }
    const userFind = await prisma.user.findUnique({ where: { email }});
    if(!userFind){
        return NextResponse.json({
            error: 'El usuario no existe'
        },{
            status: 400
        });
    }
    const validPassword = await bcrypt.compare(password, userFind.password);
    if(!validPassword){
        return NextResponse.json({
            error: 'La contraseña es incorrecta'
        },{
            status: 400
        });
    }
    const token = jwt.sign(
        { id: userFind.id },
        process.env.JWT_SECRET,
        {expiresIn: 86400 }
    );
    return NextResponse.json({
        token,
        message: 'Inicio de sesion'
    },{
        status: 200
    });
}