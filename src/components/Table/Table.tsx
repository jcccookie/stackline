import React, { useState } from 'react';
import { useSales } from '../../redux/selectors';
import styles from './Table.module.css';
import formatCurrency from '../../util/formatCurrency';
import formatDate from '../../util/formatDate';
import { Sale } from '../../types';
import ChevronDown from '../../static/ChevronDown';
import ChevronUp from '../../static/ChevronUp';
import { TABLE_COLUMNS } from '../../util/constants';

export default function Table() {
  const sales = useSales();

  const [sortedSales, setSortedSales] = useState(sales);
  const [sortDirection, setSortDirection] = useState({
    weekEnding: 'asc',
    retailSales: 'asc',
    wholesaleSales: 'asc',
    unitsSold: 'asc',
    retailerMargin: 'asc'
  });

  const handleSortByColumn = (key: string) => {
    const salesToBeSorted = [...sortedSales];

    salesToBeSorted.sort((a, b) => {
      const alpha = key === 'weekEnding' ?
        new Date(a.weekEnding).getTime() : 
        Number(a[key as keyof Sale]);

      const beta = key === 'weekEnding' ?
        new Date(b.weekEnding).getTime() :
        Number(b[key as keyof Sale]);

      setSortDirection({
        ...sortDirection,
        [key]: sortDirection[key as keyof Sale] === 'asc' ? 'dsc' : 'asc'
      });
      if (sortDirection[key as keyof Sale] === 'asc') {
        return beta - alpha;
      } 
      return alpha - beta;
    });

    setSortedSales(salesToBeSorted);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.entries(TABLE_COLUMNS).map(([key, val]) => 
              <th
                key={key} 
                scope='col'
                onClick={() => handleSortByColumn(key)}
                className={styles.column}
              >{val.toUpperCase()}
                <span className={styles.icon}>
                 {sortDirection[key as keyof Sale] === 'dsc' ? <ChevronDown /> : <ChevronUp />}
               </span>
              </th>)
            }
          </tr>
        </thead>
        <tbody>
          {sortedSales.map((sale, idx) => 
            <tr key={idx} className={styles.row}>
              <td>{formatDate(sale.weekEnding)}</td>
              <td>{formatCurrency(sale.retailSales)}</td>
              <td>{formatCurrency(sale.wholesaleSales)}</td>
              <td>{sale.unitsSold}</td>
              <td>{formatCurrency(sale.retailerMargin)}</td>
            </tr>) 
          }
        </tbody>
      </table> 
    </div>
  )
}