import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

import theme from '../../../../styles/theme';


import { Grafic, TitleGrafic } from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

type Anchor = 'start' |'center' | 'end';
type Align = number | 'start' |'center' | 'end' | 'top' | 'right' | 'left' | 'botton';

interface BarGraphicsProps {
  title: string;
  labels: Array<String>;
  formatter: (value: number) => string;
  data: Array<Number>
}



const BarGraphics: React.FC<BarGraphicsProps> = ({ title, labels, formatter, data: dados}) => {
  const anchor: Anchor = "end"
const align: Align = "end"


const options = {
  responsive: true,
  scales: {
    y: {
      display: false,
    }
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: true,
    },
    datalabels: {
      formatter: function(value: number) {
        return formatter(value);
      },
      font: {
        size: 10
      },
      anchor: anchor,
      align: align
    },
  },
};


const data = {
  labels,
  datasets: [
    {
      label: 'Vendas',  
      data: dados,
      backgroundColor: `${theme.colors.gold}`,
    },
  ],
};
  return (
    <Grafic>
      <TitleGrafic>{title}</TitleGrafic>
      <Bar options={options} data={data} />
    </Grafic>
  );
}

export default BarGraphics;