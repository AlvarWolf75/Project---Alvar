// ChartComponent.js
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ cities, ratings }) => {
  useEffect(() => {
    // Get the canvas element
    const ctx = document.getElementById('myBarChart').getContext('2d');

    // Create a bar chart
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [
          {
            label: 'Ratings',
            data: ratings,
            backgroundColor: ['red', 'green', 'blue'], // You can customize the colors
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Clean up the chart when the component unmounts
    return () => {
      myBarChart.destroy();
    };
  }, [cities, ratings]);

  return <canvas id="myBarChart" width="400" height="200"></canvas>;
};

export default ChartComponent;
