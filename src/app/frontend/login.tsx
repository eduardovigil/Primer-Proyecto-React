import React, { useState } from "react";
import { login } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const {token} = await login(email, password);
            localStorage.setItem('token', token);
        }catch (error){
            setError('Credenciales invalidas');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Contraseña" value={password} onChange={(e) => (e.target.value)}/>
            <Button type="submit">
                Iniciar Sesión
            </Button>
            {error && <p>{error}</p>}
        </form>
    );
}