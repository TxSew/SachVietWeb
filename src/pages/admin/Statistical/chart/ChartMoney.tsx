import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { httpStatistical } from '../../../../submodules/controllers/http/axiosController';
import { color } from '../../../../Theme/color';

export function ChartMOney() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const [statistical, setStatistical] = useState<number[]>([]);
    useEffect(() => {
        httpStatistical.getTwelveMonthsData().then((res) => {
            const revenueByMonth = new Array(12).fill(0);
            res.forEach(({ month, revenue }: any) => {
                revenueByMonth[month - 1] = Number(revenue);
            });
            setStatistical(revenueByMonth);
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Doanh thu',
            },
        },
    };
    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: statistical,
                backgroundColor: color.BtnDartGreen,
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
