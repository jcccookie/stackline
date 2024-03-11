import React from 'react';
import { useSales } from '../../redux/selectors';
import styles from './Chart.module.css'
import { ResponsiveLine } from '@nivo/line'
import formatChartData from '../../util/formatChartData';
import findMax from '../../util/findMax';
import { CHART_COLOR_MAPPING } from '../../util/constants';

export default function Chart({ types }: { types: string[] }) {
  const sales = useSales();
  const data = formatChartData({ types, sales });
  const { max } = findMax({ types, data });



  return (
    <div className={styles.container}>
      <div>Retail Sales</div>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        // @ts-ignore
        colors={({ id }) => CHART_COLOR_MAPPING[id]}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
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