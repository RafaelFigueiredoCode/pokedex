import React, { useEffect, useState } from 'react';
import pokeApi from '../api/pokeApi.jsx'


const RegionFilter = ({onRegionChange}) => {
    const [regions,  setRegions] = useState([]);


  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await pokeApi.get('/region');
        setRegions(response.data.results);
      } catch (error) {
        console.error('Erro ao carregar tipos:', error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <select onChange={(r) => onRegionChange(r.target.value)}>
      <option value="">Todos as Regiões</option>
      {regions.map((region) => (
        <option key={region.name} value={region.name}>
          {region.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default RegionFilter
