import React from 'react';
import styles from '../styles/card.module.css'

const PokemonCard = ({ onClick, name, imageUrl }) => (
  <div onClick={onClick} className={styles.card}>
    <img src={imageUrl} />
    <h3>{name}</h3>
  </div>
);

export default PokemonCard;