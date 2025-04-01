
import React from 'react';
import Layout from '@/components/Layout';
import AverageDealSizeCalculator from '@/components/AverageDealSizeCalculator';
import DealSizeInfo from '@/components/DealSizeInfo';

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Average Deal Size Calculator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate, analyze, and visualize your average deal size to optimize your sales strategy and drive revenue growth.
            </p>
          </div>
        </div>
        
        <AverageDealSizeCalculator />
        <DealSizeInfo />
      </div>
    </Layout>
  );
};

export default Index;
