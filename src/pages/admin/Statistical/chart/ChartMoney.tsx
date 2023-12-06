import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { color } from '../../../../Theme/color';

export function ChartMOney(props: { statistical: any; orderCountData: any }) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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
                data: props.statistical,
                backgroundColor: color.BtnDartGreen,
            },
            {
                label: 'Đơn hàng',
                data: props.orderCountData,
                backgroundColor: color.linePay,
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
