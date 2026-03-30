import React, { useState, useEffect } from "react";
import pokeApi from '../api/pokeApi.jsx';
import PokemonList from '../components/listaPokemon.jsx';
import styles from '../styles/home.module.css';
import TypeFilter from '../components/typeList.jsx';
import RegionFilter from '../components/regionList.jsx'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllPokemons = async () => {
    try {
      setLoading(true);
      const response = await pokeApi.get('/pokemon?limit=800'); 
      setAllPokemons(response.data.results)
      setPokemons(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar todos os pokémons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchAllPokemons();
}, []);

const handleTypeChange = (type) => {
  setTypeFilter(type || null);
};

const handleRegionChange = (region) => {
  setRegionFilter(region || null);
};

const handleComparatorClick = () => {
  navigate('/comparator')
}


  useEffect(() => {

  const applyFilters = async () => {
    let filtered = [...allPokemons];

    if (regionFilter) {
      const map = {
        kanto: [1, 151],
        johto: [152, 251],
        hoenn: [252, 386],
        sinnoh: [387, 493],
        unova: [494, 649],
        kalos: [650, 721],
        alola: [722, 809],
        galar: [810, 905],
      };

      const [start, end] = map[regionFilter];

      filtered = filtered.filter(p => {
        const id = Number(p.url.split('/')[6]);
        return id >= start && id <= end;
      });
    }

    if (typeFilter) {
      const detailed = await Promise.all(
        filtered.slice(0, 100).map(p => pokeApi.get(`/pokemon/${p.name}`))
      );

      filtered = detailed
        .filter(res =>
          res.data.types.some(t => t.type.name === typeFilter)
        )
        .map(res => ({
          name: res.data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.name}`,
        }));
    }

    setPokemons(filtered);
  };

  applyFilters();
}, [typeFilter, regionFilter, allPokemons]);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.home}>
      <button onClick={handleComparatorClick}>Ver Comparador de pokémons</button>
      <h1>Pokedex</h1>
      <div className= {styles.filters}>
      <TypeFilter onTypeChange={handleTypeChange} />
      <RegionFilter onRegionChange = {handleRegionChange}/>
      </div>
      <input
        type="search"
        placeholder="Pesquisar Pokémon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', marginBottom: '20px' }}
      />
      {loading ? <p>Carregando...</p> : <PokemonList pokemons={filteredPokemons} />}
    </div>
  );
}

export default Home;