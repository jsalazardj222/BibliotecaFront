import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

// Helper function to simulate barcode generation (for demo purposes)
const generateBarcode = () => {
  return Math.floor(Math.random() * 1000000000); // Simulate a random barcode (just for demo)
};

const LibrosList = ({ libros, setLibros }) => {
  // State for new book input fields
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', barcode: '' });
  const [clienteId, setClienteId] = useState(1); // You may want to get this from a user context

  // Function to handle book reservation
  const handleReservar = async (libroId) => {
    // Find the libro (book) that corresponds to the clicked "Reservar" button
    const libro = libros.find((libro) => libro.id === libroId);

    if (!libro || libro.copiasDisponibles.length === 0) {
      alert('Este libro no está disponible');
      return;
    }

    // Prepare data for the API request
    const requestData = {
      clienteId: clienteId,  // Assuming you have a client ID
      copiaLibroIds: [libro.id]  // Book copy ID (or just book ID in this case)
    };

    try {
      // Send the POST request to the backend API
      const response = await fetch('http://localhost:5031/api/Prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Error al realizar la reserva');
      }

      // If reservation is successful, update the book's availability
      const updatedLibros = libros.map((libro) =>
        libro.id === libroId
          ? { ...libro, copiasDisponibles: libro.copiasDisponibles.slice(1) } // Remove one copy from available
          : libro
      );

      setLibros(updatedLibros);  // Update the libros state with the new available copies
      alert('Reserva realizada con éxito');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al intentar realizar la reserva');
    }
  };

  const handleAddLibro = () => {
    if (!nuevoLibro.titulo) {
      alert('Por favor, ingrese un título para el libro');
      return;
    }
    const nuevoLibroConBarcode = {
      ...nuevoLibro,
      id: new Date().toISOString(), // Assign a unique id based on the current time
      barcode: generateBarcode(),
      copiasDisponibles: [1] // Assuming at least one copy is available when registered
    };
    setLibros([...libros, nuevoLibroConBarcode]);
    setNuevoLibro({ titulo: '', barcode: '' }); // Clear input fields after adding
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Libros</h2>

      <div className="row">
        {libros.map(libro => (
          <div key={libro.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{libro.titulo}</h5>
                <p className="card-text">
                  {libro.copiasDisponibles.length > 0 
                    ? <span className="text-success">Disponible</span> 
                    : <span className="text-danger">No disponible</span>}
                </p>
                <p className="card-text"><small>Barcode: {libro.barcode}</small></p>

                {/* Button only appears if available */}
                {libro.copiasDisponibles.length > 0 && (
                  <button className="btn btn-primary" onClick={() => handleReservar(libro.id)}>
                    Reservar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-4">Registrar nuevo libro</h3>
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">Título del libro</label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          placeholder="Ingrese el título del libro"
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
        />
      </div>
      <button className="btn btn-success" onClick={handleAddLibro}>Registrar</button>
    </div>
  );
};

export default LibrosList;
