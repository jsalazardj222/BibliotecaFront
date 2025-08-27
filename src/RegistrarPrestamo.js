import React, { useState } from 'react';
import axios from 'axios';

const RegistrarPrestamo = ({ selectedClienteId }) => {
  const [copiaLibroIds, setCopiaLibroIds] = useState([]);
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [message, setMessage] = useState('');

  const handlePrestamo = () => {
    if (!fechaDevolucion || copiaLibroIds.length === 0) {
      setMessage('Por favor, selecciona al menos un libro y una fecha de devolución.');
      return;
    }

    const data = {
      clienteId: selectedClienteId,
      copiaLibroIds,
      fechaDevolucion
    };

    axios.post('http://localhost:5031/api/Prestamos', data)
      .then(response => {
        setMessage('Préstamo registrado con éxito!');
      })
      .catch(error => {
        setMessage('Hubo un error al registrar el préstamo: ' + error.message);
      });
  };

  const handleSelectLibro = (libroId) => {
    setCopiaLibroIds(prevState => {
      if (prevState.includes(libroId)) {
        return prevState.filter(id => id !== libroId);
      }
      return [...prevState, libroId];
    });
  };

  return (
    <div>
      <h2>Registrar Préstamo</h2>
      <div>
        <label>Fecha de devolución: </label>
        <input
          type="date"
          value={fechaDevolucion}
          onChange={(e) => setFechaDevolucion(e.target.value)}
        />
      </div>
      <div>
        <h3>Seleccionar libros:</h3>
        <ul>
          {copiaLibroIds.map((libroId) => (
            <li key={libroId}>
              <label>
                <input
                  type="checkbox"
                  value={libroId}
                  onChange={() => handleSelectLibro(libroId)}
                />
                {libroId}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePrestamo}>Registrar Préstamo</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegistrarPrestamo;
