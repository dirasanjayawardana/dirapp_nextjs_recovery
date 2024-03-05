"use client";
import React from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { ChartInterface } from '../../interface'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)


const ChartBar = () => {

  const dataBar: ChartInterface = {
    labels: ["item1", "item2", "item3", "item4", "item5", "item6", "item7"],
    datasets: [
      {
        label: "Plot2",
        data: [10, 20, 25, 40, 20, 30, 35],
        backgroundColor: 'aqua',
        borderColor: 'red',
        borderWidth: 4,
        pointRadius: 5,
        pointHoverRadius: 7,
        yAxisID: "y2",
        type: "line"
      },
      {
        label: "Plot1",
        data: [10, 20, 30, 40, 20, 30, 40],
        backgroundColor: 'aqua',
        borderColor: '#8d9ca1',
        borderWidth: 1,
      },
      {
        label: "Plot12",
        data: [5, 7, 10, 5, 8, 5, 10],
        backgroundColor: '#8d9ca1',
        borderColor: '#8d9ca1',
        borderWidth: 1,
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
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Value Plot 1',
        },
        stacked: true,
      },
      y2: {
        beginAtZero: true,
        min: 0,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Value Plot 2',
        },
      }
    }
  }

  return (
    <div>
      <h3 className='text-center text-xl font-bold mb-2'>Bar Chart</h3>
      <Bar data={dataBar} options={optionsBar} />
    </div>
  )
}

export default ChartBar