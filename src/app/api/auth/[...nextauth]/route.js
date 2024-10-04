import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../../libs/db';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "user@user.com" },
                password: {label: "Password", type: "password", placeholder: "password"},
            },
            authorize(credentials, req) {
                return null
            }
        })
    ]
}

NextAuth(authOptions);
