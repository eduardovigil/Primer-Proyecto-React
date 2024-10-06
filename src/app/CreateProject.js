import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/projects', 
        { name },
        {
          headers: {
            Authorization: `Bearer ${authToken}` // Enviar el token JWT en los headers
          }
        }
      );
      console.log('Proyecto creado:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el proyecto');
    }
  };

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <h1>Crear Proyecto</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del proyecto"
        />
        <button type="submit">Crear Proyecto</button>
      </form>
    </div>
  );
};

export default CreateProject;
