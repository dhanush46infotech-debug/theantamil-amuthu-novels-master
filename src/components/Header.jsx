import React from 'react';
import Logo from '../assets/TTM NOVRLS.png';
import styles from '../styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="TTM Novels Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
