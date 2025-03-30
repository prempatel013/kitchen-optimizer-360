
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', waste: 65, predicted: 70 },
  { name: 'Week 2', waste: 59, predicted: 60 },
  { name: 'Week 3', waste: 80, predicted: 75 },
  { name: 'Week 4', waste: 55, predicted: 58 },
  { name: 'Week 5', waste: 40, predicted: 45 },
  { name: 'Week 6', waste: 35, predicted: 40 },
  { name: 'Week 7', waste: 30, predicted: 33 },
  { name: 'Week 8', waste: 25, predicted: null },
];

const WasteOverTime = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Waste Trends (kg)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="waste" 
                stroke="#006D77" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#E29578" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteOverTime;
