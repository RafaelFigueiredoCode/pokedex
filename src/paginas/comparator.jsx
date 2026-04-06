import React, { useState, useEffect } from "react";
import pokeApi from '../api/pokeApi.jsx';
import PokemonListComparator from '../components/pokemonListComparator.jsx';
import PokemonCard from "../components/cardPokemon.jsx";
import { vantagens } from "../components/vantagens.jsx";

export default function Comparator(){

    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemon1, setPokemon1] = useState(null)
    const [pokemon2, setPokemon2] = useState(null)
    const [resultado, setResultado] = useState('')


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

const handleClickPokemon = async (pokemon) =>
{
try {
    const response = await pokeApi.get(`/pokemon/${pokemon.name}`);
    const fullPokemon = response.data;

    if (!pokemon1) {
      setPokemon1(fullPokemon);
    } else if (!pokemon2) {
      setPokemon2(fullPokemon);
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
  }
};

const handleClickBattle = () => {
  if (!pokemon1 || !pokemon2) {
    setResultado('Selecione dois pokémons');
    return;
  }

  const tipos1 = pokemon1.types.map(t => t.type.name);
  const tipos2 = pokemon2.types.map(t => t.type.name);

  const isSuperEfetivo = (atacante, defensor) => {
    return atacante.some(tipoAtk =>
      defensor.some(tipoDef =>
        vantagens[tipoAtk]?.includes(tipoDef)
      )
    );
  };

  if (isSuperEfetivo(tipos1, tipos2)) {
    setResultado(`${tipos1.join(', ')} é super eficaz contra ${tipos2.join(', ')}`);
    return;
  }

  if (isSuperEfetivo(tipos2, tipos1)) {
    setResultado(`${tipos2.join(', ')} é super eficaz contra ${tipos1.join(', ')}`);
    return;
  }

  setResultado('Empate!');
};

return(
    <div>
        <h1>olá</h1>
        <h2>Selecione 2 Pokémons</h2>
        <h2>Veja qual se sai melhor em uma batalha comparando seus tipos!</h2>
        <div> {pokemon1 ? 
          <PokemonCard
          name={pokemon1.name}
          type={pokemon1.types?.map(t => t.type.name) || []}
          imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon1.name}.png`}
          />
          :
          <p>Escolha o primeiro</p>
        }
        </div>

        <h1>VS</h1>
        <div> {pokemon2 ? 
          <PokemonCard
          name={pokemon2.name}
          type={pokemon2.types?.map(t => t.type.name) || []}
          imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon2.name}.png`}
          />
          :
          <p>Escolha o segundo</p>
        }
        </div>
        <button onClick={handleClickBattle}>Lutar!</button>
        <p>{resultado}</p>
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