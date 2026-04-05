import React from 'react';
import styles from '../styles/card.module.css'

const PokemonCard = ({ onClick, name, imageUrl, type }) => (
 console.log(type),
  <div onClick={onClick} className={styles.card}>
    <img src={imageUrl} />
    <h3>{name}</h3>
    <p>{type?.join(', ')}</p>
  </div>
);

export default PokemonCard;