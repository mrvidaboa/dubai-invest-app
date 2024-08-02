import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



// Mock data for charts
const marketTrendData = [
  { month: 'Jan', price: 1000000 },
  { month: 'Feb', price: 1050000 },
  { month: 'Mar', price: 1100000 },
  { month: 'Apr', price: 1080000 },
  { month: 'May', price: 1150000 },
  { month: 'Jun', price: 1200000 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$5,000,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Properties Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7</p>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={300} data={marketTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Calculate ROI</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currency Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Convert Currency</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Saved Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Downtown Dubai Apartment</li>
              <li>Palm Jumeirah Villa</li>
              <li>Dubai Marina Office Space</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}