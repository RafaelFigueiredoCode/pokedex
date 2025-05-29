
import PokemonCard from './cardPokemon.jsx';
import styles from '../styles/pokedex.module.css'

import { Link } from 'react-router-dom';

const PokemonList = ({ pokemons }) => {
  return (
    <div className= {styles.layout}>
      {pokemons.map((pokemon) => {
        return (
        <Link className={styles.link} key={pokemon.name} to={`/pokemons/${pokemon.name}`}>
        <PokemonCard
        name={pokemon.name}
        imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
        />
        </Link>
        );
      })}
    </div>
  );
};

export default PokemonList