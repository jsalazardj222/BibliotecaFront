import React from 'react';

const ClientesList = ({ clientes, onSelectCliente }) => {
  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id} onClick={() => onSelectCliente(cliente.id)}>
            {cliente.nombreCompleto} (ID: {cliente.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientesList;
