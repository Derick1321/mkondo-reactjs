import React from 'react';
import styles from './index.module.scss';

const Home = () => {
  return (
    <>
        <div className={styles.slider}></div>
        <div className='container'>
            <h1 className='text-light'>Welcome to Mkondo</h1>
        </div>
    </>
  )
}

export default Home;