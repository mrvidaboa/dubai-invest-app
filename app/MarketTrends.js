'use client';

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MarketTrends() {
  // Mock data - in a real application, this would come from an API or database
  const priceData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Average Property Price (AED)',
        data: [1000000, 950000, 920000, 980000, 1050000, 1100000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const rentalYieldData = {
    labels: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Arabian Ranches', 'JBR'],
    datasets: [
      {
        label: 'Average Rental Yield (%)',
        data: [5.8, 6.2, 5.5, 5.9, 6.5],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Market Trends and Analytics</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Property Price Trends</h2>
        <Line 
          data={priceData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Average Property Prices in Dubai',
              },
            },
          }}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Rental Yields by Area</h2>
        <Bar 
          data={rentalYieldData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Average Rental Yields in Popular Areas',
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
          <ul className="list-disc list-inside">
            <li>Property prices have shown a steady increase since 2020</li>
            <li>JBR currently offers the highest average rental yield</li>
            <li>Downtown Dubai remains a popular area for investors</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Investment Recommendations</h3>
          <ul className="list-disc list-inside">
            <li>Consider properties in JBR for high rental yields</li>
            <li>Long-term investments in Downtown Dubai may offer good capital appreciation</li>
            <li>Keep an eye on emerging areas for potential growth opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}