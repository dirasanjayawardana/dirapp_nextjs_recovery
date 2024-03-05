import React from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { ChartInterface } from '../../interface'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const ChartBarHorizontal = () => {

    const dataBar: ChartInterface = {
        labels: ["item1", "item2", "item3", "item4"],
        datasets: [
            {
                label: "Plot1",
                data: [10, 20, 30, 40],
                backgroundColor: '#ff5e5e',
                borderColor: '#8d9ca1',
                borderWidth: 1,
            },
            {
                label: "Plot12",
                data: [5, 7, 10, 5],
                backgroundColor: '#8d9ca1',
                borderColor: '#8d9ca1',
                borderWidth: 1,
            },
        ]
    }

    const optionsBar: any = {
        indexAxis: 'y', // Menetapkan sumbu horizontal (x)
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
        },
        scales: {
            x: { // Mengatur opsi untuk sumbu horizontal (x)
                beginAtZero: true,
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Value Plot 1',
                },
                stacked: true,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Labels',
                },
                stacked: true,
            },
        },
    }

    return (
        <div className='w-full'>
            <h3 className='text-center text-xl font-bold mb-2'>Horizontal Bar Chart</h3>
            <Bar data={dataBar} options={optionsBar} />
        </div>
    )
}

export default ChartBarHorizontal
