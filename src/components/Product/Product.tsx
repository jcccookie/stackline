import React from 'react';
import { useProduct } from '../../redux/selectors';
import styles from './Product.module.css';

export default function Product() {
  const { 
    image, title, subtitle, tags = []
  } = useProduct() || {};

  return (
    <div className={styles.container}>
      <img src={image} alt="product" className={styles.image}/>
      <h2 className={styles.title}>{title}</h2> 
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles['tags-container']}>
        {tags.map(tag => <button key={tag} className={styles['tags-button']}>{tag}</button>)}
      </div>
    </div>
  )
}