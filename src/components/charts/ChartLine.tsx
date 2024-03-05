"use client";
import React from 'react'
import { Line } from 'react-chartjs-2';
import { ChartInterface } from '../../interface'


const ChartLine = () => {

  const chartData: ChartInterface = {
    labels: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"],
    datasets: [
      {
        label: "plot1",
        data: [22, 31, 35, 40, 24, 18, 27, 33, 15, 21],
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: "line"
      },
      {
        label: "plot1",
        data: [22, 21, 25, 30, 34, 28, 17, 23, 25, 27],
        backgroundColor: ["#ffab00"],
        borderColor: "#ffab00",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: "line"
      },
      {
        label: "plot1",
        data: [20, 39, 31, 30, 44, 28, 35, 30, 25, 18],
        backgroundColor: ["rgba(0, 150, 58, 0.8)"],
        borderColor: "rgba(0, 150, 58, 0.8)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: "line"
      },
      {
        label: "plot1",
        data: [10, 29, 21, 40, 34, 38, 25, 34, 35, 28],
        backgroundColor: ["#ff5e5e"],
        borderColor: "#ff5e5e",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        type: "line"
      }
    ]
  }

  const chartOptions: any = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      }
    },
    scale: {
      y: {
        beginAtZero: true,
        min: 0,
        type: 'linear',
        possition: 'left',
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    
  }

  return (
    <div className=''>
      <h3 className='text-center text-xl font-bold mb-2'>Line Chart</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default ChartLine