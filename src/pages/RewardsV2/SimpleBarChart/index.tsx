import { denominated } from 'pages/Dashboard/helper/denominate';
import * as React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  // CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import styles from './chartStyle.module.scss';
import CustomLegend from './CustomLegend';

const data1 = [
  { name: 10, pv: 2400, amt: 2400 },
  { name: 20, pv: 1398, amt: 2210 },
  { name: 30, pv: 9800, amt: 2290 },
  { name: 40, pv: 3908, amt: 2000 },
  { name: 50, pv: 4800, amt: 2181 },
  { name: 60, pv: 3800, amt: 2500 },
  { name: 70, pv: 4300, amt: 2100 }
];

const data2 = [
  { name: 10, uv: 4000, amt: 2400 },
  { name: 45, uv: 3490, amt: 2100 }
];

const generateDefaultDateData = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const defaultData: { [key: string]: number } = {};

  for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
    const yearMonth = d.toISOString().slice(0, 7);
    defaultData[yearMonth] = 0;
  }

  return defaultData;
};
const SimpleBarChart = (data: any) => {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [visibleLines, setVisibleLines] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleLegendClick = (e: any) => {
    const { payload } = e;
    const legendText = payload.name;
    const year = legendText.split(' ')[1];

    if (year) {
      setVisibleLines((prevVisibleLines) => ({
        ...prevVisibleLines,
        [year]: !prevVisibleLines[year]
      }));
    }
  };

  React.useEffect(() => {
    const yearData: { [key: string]: any[] } = {};
    if (data.yearsChoice === 'All') {
      data.points.points.forEach((point: any) => {
        const year = point.slice(0, 4);
        if (!yearData[year]) {
          yearData[year] = [];
        }
        yearData[year].push(point);
      });

      const yearDataArray = Object.values(yearData);

      const newData = yearDataArray
        .map((year: any) =>
          year.map((date: any, index: number) => {
            const sum = data.rewards.tx[date]
              .map((item: any, index: number) => Number(denominated(item.earn)))
              .reduce(
                (accumulator: number, currentValue: number) =>
                  accumulator + currentValue,
                0
              );
            return { year: date, rewards: sum };
          })
        )
        .reverse()
        .flat()
        .sort(
          (a: any, b: any) =>
            new Date(a.year).getTime() - new Date(b.year).getTime()
        );

      setChartData(newData.flat());
    } else if (data.yearsChoice === 'Compare') {
      const yearMonthData: { [key: string]: { [key: string]: number } } = {};

      data.points.points.forEach((point: any) => {
        const year = point.slice(0, 4);
        const month = point.slice(5, 7);
        if (!yearMonthData[year]) {
          yearMonthData[year] = {};
        }
        if (!yearMonthData[year][month]) {
          yearMonthData[year][month] = 0;
        }
        const sum = data.rewards.tx[point]
          .map((item: any) => Number(denominated(item.earn)))
          .reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0
          );
        yearMonthData[year][month] += sum;
      });

      const newData = Object.entries(yearMonthData).reduce(
        (acc: any, [year, monthData]) => {
          acc[year] = [];
          for (let month = 1; month <= 12; month++) {
            const monthStr = month.toString().padStart(2, '0');
            acc[year].push({
              month: Number(monthStr),
              rewards: monthData[monthStr] || 0
            });
          }
          return acc;
        },
        {}
      );
      const initialVisibleLines: { [key: string]: boolean } = {};
      Object.keys(newData).forEach((year) => {
        initialVisibleLines[year] = true;
      });

      setVisibleLines(initialVisibleLines);
      setChartData(newData);
    } else {
      const datesfilter = data.points.points.filter((date: string) =>
        date.startsWith(data.yearsChoice)
      );

      InformationRewards(datesfilter);
    }
  }, [data]);

  const InformationRewards = (tableau: any) => {
    // Générer des données par défaut pour toutes les dates entre la première et la dernière date
    const defaultData = generateDefaultDateData(
      tableau[0],
      tableau[tableau.length - 1]
    );

    const newData = tableau.map((date: any, index: number) => {
      const sum = data.rewards.tx[date]
        .map((item: any, index: number) => Number(denominated(item.earn)))
        .reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );

      return { year: date, rewards: sum };
    });

    // Fusionner les données par défaut et les données existantes
    newData.forEach((item: any) => {
      defaultData[item.year] = item.rewards;
    });

    // Transformer les données fusionnées en un tableau d'objets
    const mergedData = Object.entries(defaultData).map(([year, rewards]) => ({
      year,
      rewards
    }));

    setChartData(mergedData.reverse());
  };

  console.log(chartData);

  const xAxisColor = '#fff';
  const yAxisColor = '#fff';

  const CouleurButton = ['#36CA8C', '#FBC34C', '#F3BF89', '#E48570'];

  function monthName(monthNumber: number) {
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];
    return months[monthNumber - 1];
  }

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width='100%' height={200}>
        {/* {data.yearsChoice !== 'Compare' ? ( */}
        <LineChart
          // width={500}
          height={300}
          data={Array.isArray(chartData) ? chartData : chartData}
        >
          {data.yearsChoice !== 'Compare' ? (
            <XAxis
              stroke={xAxisColor}
              dataKey={data.yearsChoice !== 'Compare' ? 'year' : 'month'}
            />
          ) : (
            <XAxis
              dataKey='month'
              domain={[1, 12]}
              type='number'
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              tick={{ fontSize: 10, fill: 'red' }}
              tickFormatter={(value) => monthName(value)}
            />
          )}
          <YAxis stroke={yAxisColor} />
          <Tooltip content={<CustomTooltip />} />
          {data.yearsChoice !== 'Compare' ? (
            <>
              <Legend wrapperStyle={{ color: 'white' }} />
              <defs>
                <linearGradient
                  id='lineGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop offset='0%' stopColor='#22f7dd' />
                  <stop offset='20%' stopColor='#00d8f8' />
                  <stop offset='40%' stopColor='#00b3ff' />
                  <stop offset='60%' stopColor='#0086ff' />
                  <stop offset='100%' stopColor='#2044f5' />
                </linearGradient>
              </defs>
              <Line
                // isAnimationActive={false}
                connectNulls
                animationEasing={'linear'}
                type='monotone'
                dataKey='rewards'
                stroke='url(#lineGradient)'
              />
            </>
          ) : (
            <>
              <Legend
                content={({ payload }: any) => (
                  <CustomLegend
                    payload={payload}
                    onClick={handleLegendClick}
                    visibleLines={visibleLines}
                  />
                )}
              />
              {Object.entries(chartData).map(
                ([year, yearData]: [string, any[]], index) => {
                  const isVisible = visibleLines[year] === false;
                  // const legendStyle = isVisible ? {} : { textDecoration: 'line-through' };

                  return (
                    <Line
                      animationEasing={'linear'}
                      // isAnimationActive={false}
                      hide={visibleLines[year] === false}
                      key={index}
                      type='monotone'
                      data={yearData}
                      dataKey='rewards'
                      name={`Année ${year}`}
                      stroke={CouleurButton[index]}
                      activeDot={{ r: 5 }}
                    />
                  );
                }
              )}
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SimpleBarChart;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`Mois ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            className={styles.item}
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
