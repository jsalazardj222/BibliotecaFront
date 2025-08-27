import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientesList from './clientesList';
import LibrosList from './LibrosList';
import RegistrarPrestamo from './RegistrarPrestamo';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [libros, setLibros] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState(3); // Cliente 3 por defecto

  useEffect(() => {
    // Obtener clientes
    axios.get('http://localhost:5031/api/Clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });

    // Obtener libros
    axios.get('http://localhost:5031/api/Prestamos')
      .then(response => {
        setLibros(response.data);
      })
      .catch(error => {
        console.error('Error fetching libros:', error);
      });
  }, []);

  const handleClienteSelect = (id) => {
    setSelectedClienteId(id);
  };

  return (
    <div>
      <h1>Biblioteca</h1>
      <ClientesList clientes={clientes} onSelectCliente={handleClienteSelect} />
      <LibrosList libros={libros} />
      <RegistrarPrestamo selectedClienteId={selectedClienteId} />
    </div>
  );
}

export default App;
