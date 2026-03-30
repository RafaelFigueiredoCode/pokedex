import React, { useState, useEffect } from "react";
import pokeApi from '../api/pokeApi.jsx';
import PokemonListComparator from '../components/pokemonListComparator.jsx';

export default function Comparator(){

    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemon1, setPokemon1] = useState(null)
    const [pokemon2, setPokemon2] = useState(null)


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

const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
) 

const handleClickPokemon = (pokemon) =>
{
    if(!pokemon1) {
        setPokemon1(pokemon)
    } else if(!pokemon2){
        setPokemon2(pokemon)
    }
};

return(
    <div>
        <h1>olá</h1>
        <h2>Selecione 2 Pokémons</h2>
        <h2>Veja qual se saí melhor em uma batalha comparando seus tipos!</h2>
        <div> {pokemon1 ? <p>{pokemon1.name}</p> : <p>Escolha o primeiro</p>} </div>
        <h1>VS</h1>
        <div> {pokemon2 ? <p>{pokemon2.name}</p> : <p>Escolha o segundo</p>} </div> 
        <input
        type= 'search'
        placeholder= 'pesquise seu Pokémon'
        value={searchTerm}
        onChange={ e => setSearchTerm(e.target.value) }
        ></input>
        {loading ? <p>...Carregando</p> : <PokemonListComparator pokemons={filteredPokemons} PokemonSelecionado={handleClickPokemon} />}
    </div>
  );
}