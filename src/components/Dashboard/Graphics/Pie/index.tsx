import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Grafic, TitleGrafic} from './styles';

import theme from '../../../../styles/theme';

interface PieGraphicsProps {
    title: string;
    labels: Array<String>;
    formatter: (value: number) => string;
    data: Array<Number>
}

type Anchor = 'start' |'center' | 'end';
type Align = number | 'start' |'center' | 'end' | 'top' | 'right' | 'left' | 'botton';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


const PieGraphic: React.FC<PieGraphicsProps> = ({data: dataPie, formatter, labels, title}) => {
    const anchor: Anchor = "center"
    const align: Align = "center"
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
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
        labels: labels,
        datasets: [
          {
            data: dataPie,
            backgroundColor: [
                `${theme.colors.gold}`,
                `${theme.colors.primary}`,
                `${theme.colors.orange}`
            ],
            borderColor: [
              `${theme.colors.gold}`,
              `${theme.colors.primary}`,
              `${theme.colors.gold}`
            ],
            borderWidth: 2,
          },
        ],
      };
    
  return (
      <Grafic>
        <TitleGrafic>{title}</TitleGrafic>
        <Pie options={options} data={data} />
      </Grafic>
    );
}

export default PieGraphic;