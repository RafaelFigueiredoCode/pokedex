import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import pokeApi from '../api/pokeApi.jsx';
import PokemonList from '../components/listaPokemon.jsx';
import styles from '../styles/home.module.css';
import TypeFilter from '../components/typeList.jsx';
import RegionFilter from '../components/regionList.jsx'

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [regionFilter, setRegionFilter] = useState(null)

  const fetchAllPokemons = async () => {
    try {
      setLoading(true);
      const response = await pokeApi.get('/pokemon?limit=800'); 
      setPokemons(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar todos os pokémons:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByType = async (type) => {
    try {
      setLoading(true);
      const response = await pokeApi.get(`/type/${type}`);
      const pokemonList = response.data.pokemon.map(p => p.pokemon);
      setPokemons(pokemonList.slice(0,100)); 
    } catch (error) {
      console.error('Erro ao buscar por tipo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  const fetchByRegion = async (regionName) => {
  try {
    setLoading(true);
    const regionResponse = await pokeApi.get(`/region/${regionName}`);
    
    const pokedexes = regionResponse.data.pokedexes;
    if (pokedexes.length === 0) {
      setPokemons([]);
      return;
    }

    const pokedexName = pokedexes[0].name;
    const pokedexResponse = await pokeApi.get(`/pokedex/${pokedexName}`);
    const pokemonList = pokedexResponse.data.pokemon_entries.map(entry => ({
      name: entry.pokemon_species.name,
      url: `https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`,
    }));

    setPokemons(pokemonList);
  } catch (error) {
    console.error('Erro ao buscar por região:', error);
  } finally {
    setLoading(false);
  }
};

  const handleTypeChange = (type) => {
    if (!type) {
      setTypeFilter(null);
      fetchAllPokemons();
    } else {
      setTypeFilter(type);
      fetchByType(type);
    }
  };
  const handleRegionChange = (region) => {
  if (!region) {
    setRegionFilter(null);
    fetchAllPokemons();
  } else {
    setRegionFilter(region);
    fetchByRegion(region);
  }
};

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.home}>
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