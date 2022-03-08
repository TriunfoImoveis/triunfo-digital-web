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

type Anchor = 'start' | 'center' | 'end';
type Align = number | 'start' | 'center' | 'end' | 'top' | 'right' | 'left' | 'botton';

interface BarGraphicsProps {
    title: string;
    labels: Array<String>;
    formatter: (value: number) => string;
    data: Array<Number>
}



const HorizontalBarGraphics: React.FC<BarGraphicsProps> = ({ title, labels, formatter, data: dados }) => {
    const anchor: Anchor = "start"
    const align: Align = "end"


    const options = {
        maintainAspectRatio: true,
        indexAxis: 'y' as const,
        scales: {
            y: {
                display: true,
            },
            x: {
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
                formatter: function (value: number) {
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <Grafic>
            <TitleGrafic>{title}</TitleGrafic>
            <div className="container">
                <Bar options={options} data={data} />
            </div>
        </Grafic>
    );
}

export default HorizontalBarGraphics;