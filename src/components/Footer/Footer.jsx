import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../assets/images/Logo.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <img src={logo}  className=' w-[50px]'alt='logo'/>
           <h2> Recipe </h2>
           </div>
        <div className={styles.route}>Route</div>
      </div>
      <div className={styles.footerBottom}>
        © 2025 Nagy Osama™. All Rights Reserved.
      </div>
    </footer>
  );
}
