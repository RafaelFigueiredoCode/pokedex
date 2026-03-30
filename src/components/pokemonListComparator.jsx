import { Link } from 'react-router-dom';
import PokemonCard from './cardPokemon.jsx';
import styles from '../styles/pokedex.module.css'

const PokemonListComparator = ({ pokemons, PokemonSelecionado }) => {

  return (
    <div className= {styles.layout}>
      {pokemons.map((pokemon) => {
        return (
        <PokemonCard
        key={pokemon.name}
        classname={styles.link}
        name={pokemon.name}
        imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
        onClick={() => PokemonSelecionado(pokemon)}
        />
        );
      })}
    </div>
  );

  
};

export default PokemonListComparator