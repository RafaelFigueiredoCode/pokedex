import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/detalhes.module.css'
import { useNavigate } from 'react-router-dom';


const DetalhePokemon = () => {
  const { id } = useParams(); // 
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([])
  const navigate = useNavigate()
  const [weaknesses, setWeaknesses] = useState([])

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
       
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

     
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();
        const evolutionUrl = speciesData.evolution_chain.url;

        const evolutionRes = await fetch(evolutionUrl);
        const evolutionData = await evolutionRes.json();

        const chain = [];
        let current = evolutionData.chain;
        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to[0];
        }
        setEvolutions(chain);

        
        const weakTypesSet = new Set();
        for (const typeInfo of data.types) {
          const typeName = typeInfo.type.name;
          const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
          const typeData = await typeRes.json();

          typeData.damage_relations.double_damage_from.forEach(t => {
            weakTypesSet.add(t.name);
          });
        }
        setWeaknesses([...weakTypesSet]);

      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
      }
    };

    fetchPokemon();
  }, [id]);

    

  if (!pokemon) return <p>Carregando...</p>;

  const handleImgClick = (name) => {
    navigate(`/pokemons/${name}`)
  };
  const handleVoltarClick = () => {
    navigate('/')

  

  return (
    <div className= {styles.div}>
    <p onClick ={handleVoltarClick} className= {styles.voltar}>Voltar Para o Inicio</p>
      <h1>{pokemon.name}</h1>
      <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt={pokemon.name} />
      <p><strong>Altura:</strong> {pokemon.height} decímetros</p>
      <p><strong>Peso:</strong> {pokemon.weight} kg</p>
      <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Habilidades:</strong>{pokemon.abilities.map(m => m.ability.name).join(', ')}</p>
      <p><strong>Fraquezas:</strong> {weaknesses.length > 0 ? weaknesses.join(', ') : 'Nenhuma'}</p>
      <h2 className ={styles.h}>Cadeia de Evolução</h2>
      <ul className = {styles.evolutionList}>
        {evolutions.map (name => (
        <li key= {name}>
         <img src= {`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
         alt ={name}
         className={styles.evolutionImg} onClick = {() => handleImgClick(name)}/>
         <p>{name}</p>
        </li>
        ))}
      </ul>
      
    </div>
  );
}
export default DetalhePokemon;
