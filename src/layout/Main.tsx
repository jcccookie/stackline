import React, { useEffect } from 'react';
import styles from './Layout.module.css';
import { useDispatch } from 'react-redux'
import { getProductById } from '../redux/productSlice';
import type { AppDispatch  } from '../redux/store';
import { useProductState } from '../redux/selectors';
import Product from '../components/Product/Product';
import Chart from '../components/Chart/Chart';
import Table from '../components/Table/Table';

export default function Main() {
  const productId = 'B007TIE0GQ';
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [dispatch]);

  const { 
    data,
    loading, 
    error 
  } = useProductState();

  if (loading) {
    return <div style={{ 
      textAlign: 'center', 
      margin: '0 auto', 
      fontSize: '5rem',
      marginTop: '40rem'
    }}>Loading...</div>
  };

  if (error) {
    return <div>Error</div>
  };

  if (!data) {
    return <div>No products found</div>
  };

  return (
    <main>
      <div className={styles['main-container']}>
        <div className={styles['grid-wrapper']}>
          <Product />
          <Chart />
          <Table />
        </div>
      </div>
    </main>
  )
};