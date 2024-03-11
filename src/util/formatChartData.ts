import { Sale } from '../types';

export default function formatChartData({ 
  types, sales 
}: { types: string[], sales: Sale[]}) {
  return types.map(type => {
    return {
      id: type,
      data: sales.map(sale => ({
        x: sale.weekEnding,
        y: sale[type as keyof Sale]
      }))
    }
  }); 
};