import React, { useEffect, useState } from 'react';
import pokeApi from '../api/pokeApi.jsx';

const TypeFilter = ({ onTypeChange }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await pokeApi.get('/type');
        const filteredTypes = response.data.results.filter(
          (type) => type.name !== 'shadow' && type.name !== 'unknown'
        );
        setTypes(filteredTypes);
      } catch (error) {
        console.error('Erro ao carregar tipos:', error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <select onChange={(e) => onTypeChange(e.target.value)}>
      <option value="">Todos os Tipos</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;