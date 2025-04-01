
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface DealSizeChartProps {
  averageDealSize: number;
  comparisonDealSize: number;
}

export const DealSizeChart: React.FC<DealSizeChartProps> = ({ 
  averageDealSize, 
  comparisonDealSize 
}) => {
  
  const barData = [
    {
      name: 'Your Average',
      value: averageDealSize,
    },
    {
      name: 'Comparison',
      value: comparisonDealSize,
    },
  ];
  
  // Calculate breakdown of deal sizes for pie chart
  const smallDeals = averageDealSize * 0.6;
  const mediumDeals = averageDealSize * 0.3;
  const largeDeals = averageDealSize * 0.1;

  const pieData = [
    { name: 'Small Deals', value: smallDeals, color: '#7ac9a7' },
    { name: 'Medium Deals', value: mediumDeals, color: '#4a8fe7' },
    { name: 'Large Deals', value: largeDeals, color: '#e9c46a' },
  ];

  const COLORS = ['#7ac9a7', '#4a8fe7', '#e9c46a'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary font-semibold">
            ₹{formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary font-semibold">
            ₹{formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={barData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="Deal Size" fill="#245e4f" barSize={50} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div>
        <h4 className="text-center mb-2 text-sm text-gray-600">Deal Size Breakdown</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<PieCustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
