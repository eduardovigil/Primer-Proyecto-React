import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Projects = () => {
  const { authToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects', {
          headers: {
            Authorization: `Bearer ${authToken}` // Enviar el token JWT en los headers
          }
        });
        setProjects(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar proyectos');
      }
    };

    if (authToken) {
      fetchProjects();
    }
  }, [authToken]);

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <h1>Proyectos</h1>
      {error && <p>{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
