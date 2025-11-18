import React from 'react';
import Logo from '../assets/TTM NOVRLS.png';
import styles from '../styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 20px',
      height: 'auto',
      minHeight: '60px'
    }}>
      <img src={Logo} alt="TTM Novels Logo" className={styles.logo} style={{ height: '120px' }} />
    </header>
  );
};

export default Header;
