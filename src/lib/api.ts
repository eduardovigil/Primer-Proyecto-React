import axios from 'axios';

export const register = async (email: string, password: string, name: string, rol: string) => {
    try {
        const response = await axios.post('/api/auth/register', { email, password, name, rol});
        return response.data;
    } catch (error) {
        throw new Error('error durante el registro');
    }
};
export const login = async ( email: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', {email, password});
        return response.data;
    } catch (error) {
        throw new Error('error durante el inicio de sesion');
    }
};