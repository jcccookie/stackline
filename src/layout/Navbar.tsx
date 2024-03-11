import React from 'React';
import Logo from '../static/Logo';
import styles from './Layout.module.css';

export default function Navbar() {
  return (
    <nav>
      <div className={styles['nav-container']}>
        <a href='/'>
          <Logo />
        </a>
      </div>
    </nav>
  )
}