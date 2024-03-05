"use client";
import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartInterface } from '../../interface'

ChartJS.register(...registerables);


const ChartArea = () => {

    const dataBar: ChartInterface  = {
        labels: ["item1", "item2", "item3", "item4", "item5", "item6", "item7"],
        datasets: [
            {
                label: "Plot2",
                data: [5, 7, 10, 5, 8, 5, 10],
                backgroundColor: 'rgba(255, 176, 0, 0.4)',
                borderColor: 'rgba(255, 176, 0, 1)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Plot3",
                data: [15, 17, 10, 15, 18, 15, 10],
                backgroundColor: 'rgba(0, 150, 58, 0.7)',
                borderColor: 'rgba(0, 150, 58, 1)',
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Plot1",
                data: [10, 30, 20, 40, 20, 30, 20],
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: true,
            },
        ]
    }

    const optionsBar: any = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
        },
        scales: {
            y: {
                min: 0,
                type: 'linear',
                title: {
                    display: true,
                    text: 'Value Plot',
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                // ticks: {
                //     display: false,
                // }
            },
            x: {
                title: {
                    display: false,
                    text: 'Date-Time'
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                // ticks: {
                //     display: false,
                // }
            },
        },
        elements: {
            line: {
                tension: 0.4, // Menambahkan opsi tension untuk membuat garis lebih halus
            },
        },
    }

    return (
        <div>
            <h3 className='text-center text-xl font-bold mb-2'>Area Chart</h3>
            <Line data={dataBar} options={optionsBar} />
        </div>
    )
}

export default ChartArea