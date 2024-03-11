import React, { useState, useMemo } from 'react';
import { useSales } from '../../redux/selectors';
import styles from './Chart.module.css'
import { ResponsiveLine } from '@nivo/line'
import formatChartData from '../../util/formatChartData';
import findMax from '../../util/findMax';
import { CHART_COLOR_MAPPING } from '../../util/constants';
import { TABLE_COLUMNS } from '../../util/constants';

export default function Chart() {
  const sales = useSales();
  const types = Object.keys(TABLE_COLUMNS)
    .filter(item => item !== 'weekEnding' && item !== 'unitsSold');
  const data = useMemo(() => formatChartData({ types, sales }), [types, sales]);

  const [filteredData, setFilteredData] = useState(data);
  console.log("🚀:zzz: ~ Chart ~ filteredData:", filteredData)

  const { max } = findMax({ types, data });

  const handleTypeButtons = (type: string) => {
    setFilteredData(data.filter(({ id }) => type === id));
  };

  const handleRefreshButton = () => {
    setFilteredData(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {types.map(type => 
            <button 
              key={type} 
              onClick={() => handleTypeButtons(type)}
              className={styles.button}
              style={{
                // @ts-ignore
                backgroundColor: CHART_COLOR_MAPPING[type]
              }}
            // @ts-ignore
            >{TABLE_COLUMNS[type]}</button>
          )
        }
        <button onClick={handleRefreshButton} className={styles.button}>All</button>
      </div>
      <ResponsiveLine
        data={filteredData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        // @ts-ignore
        colors={({ id }) => CHART_COLOR_MAPPING[id]}
        xScale={{ 
          type: 'time', 
          format: '%Y-%m-%d', 
          precision: 'day',
          useUTC: false 
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear', 
          min: -(max * 3),
          max: max * 5,
          stacked: true, 
          reverse: false 
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: '%b', 
            tickValues: 'every 1 month', 
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        curve="monotoneX"
        axisLeft={null}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        areaOpacity={0.2}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableCrosshair={true}
        useMesh={true}
        lineWidth={5}
        theme={{
          text: {
            fontSize: '1.3rem',
            fill: '#a0a0a0'
          }
        }}
      />
   </div>
  );
}