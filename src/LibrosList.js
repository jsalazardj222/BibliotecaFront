import React from 'react';

const LibrosList = ({ libros }) => {
  return (
    <div>
      <h2>Libros</h2>
      <ul>
        {libros.map(libro => (
          <li key={libro.id}>
            {libro.titulo} - {libro.disponible ? "Disponible" : "No disponible"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LibrosList;
