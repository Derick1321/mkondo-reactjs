import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [3, 5, 2, 1, 2, 0, 2],
      fill: true,
      backgroundColor: '#FC0135', // rgb(255, 99, 132)
      borderColor: '#FC0135', // rgba(255, 99, 132, 0.2)
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = (props) => {
  return (
    <>
      <div className='header'>
        <h1 className='title text-light'>Line Chart</h1>
      </div>
      <Line
        data={data}
        options={options}
        height={80}
      />
    </>
  );
}

export default LineChart;
