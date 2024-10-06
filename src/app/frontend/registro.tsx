import { useState } from "react";
import { register } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol ] = useState("");
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, email, password, rol);
        }catch (error){
            setError('Error durante el registro');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <Input placeholder="Nombre" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Rol" value={rol} onChange={(e) => setRol(e.target.value)}></Input>
            <Input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Register</Button>
            {error && <p>{error}</p>}
        </form>
    );
}

