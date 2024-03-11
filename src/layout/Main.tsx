import React, { useEffect } from 'react';
import styles from './Layout.module.css';
import Product from '../components/Product/Product';
import Chart from '../components/Chart/Chart';
import Table from '../components/Table/Table';
import { useDispatch } from 'react-redux'
import { getProductById } from '../redux/productSlice';
import type { AppDispatch  } from '../redux/store';
import { useProductState } from '../redux/selectors';

export default function Main() {
  const productId = 'B007TIE0GQ';
  const chartType = ['retailSales', 'wholesaleSales', 'unitsSold', 'retailerMargin'];
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
    return <div>Loading</div>
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
          <Chart types={chartType}/>
          <Table />
        </div>
      </div>
    </main>
  )
};