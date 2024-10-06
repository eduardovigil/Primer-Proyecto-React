import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        password,
        email,
        rol
      });
      
      console.log('Usuario registrado:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <input
          type="text"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          placeholder="Rol"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
