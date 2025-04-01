
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DealSizeChart } from './DealSizeChart';
import { ArrowUp, ArrowDown, Download, Mail } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import EmailForm from './EmailForm';

const AverageDealSizeCalculator: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(10000000);
  const [totalDeals, setTotalDeals] = useState<number>(100);
  const [averageDealSize, setAverageDealSize] = useState<number>(0);
  const [comparisonDealSize, setComparisonDealSize] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [isPositiveChange, setIsPositiveChange] = useState<boolean>(true);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState<boolean>(false);

  useEffect(() => {
    calculateAverageDealSize();
  }, [totalRevenue, totalDeals]);

  const calculateAverageDealSize = () => {
    if (totalDeals <= 0) {
      toast.error("Total deals must be greater than zero");
      return;
    }

    const calculatedAvgDealSize = totalRevenue / totalDeals;
    setAverageDealSize(calculatedAvgDealSize);
    
    // Set default comparison if not set yet
    if (comparisonDealSize === 0) {
      setComparisonDealSize(calculatedAvgDealSize * 0.9);
    }

    // Calculate difference and percentage change
    const diff = calculatedAvgDealSize - comparisonDealSize;
    setDifference(diff);
    
    const percentChange = comparisonDealSize !== 0 
      ? (diff / comparisonDealSize) * 100 
      : 0;
    
    setPercentageChange(Math.abs(percentChange));
    setIsPositiveChange(diff >= 0);
  };

  const handleTotalRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setTotalRevenue(value);
  };

  const handleTotalDealsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setTotalDeals(value);
  };

  const handleComparisonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setComparisonDealSize(value);
    
    // Recalculate differences
    const diff = averageDealSize - value;
    setDifference(diff);
    
    const percentChange = value !== 0 
      ? (diff / value) * 100 
      : 0;
    
    setPercentageChange(Math.abs(percentChange));
    setIsPositiveChange(diff >= 0);
  };

  const handleDownload = () => {
    toast.success("Preparing PDF for download...");
    // Actual PDF generation would be implemented here
    setTimeout(() => {
      toast.success("PDF downloaded successfully!");
    }, 2000);
  };

  const handleEmail = () => {
    setIsEmailFormOpen(true);
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
  };

  const calculationData = {
    totalRevenue,
    totalDeals,
    averageDealSize,
    comparisonDealSize
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Card className="calculator-card mb-8">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl text-primary">Average Deal Size Calculator</CardTitle>
          <CardDescription>
            Calculate and visualize your average deal size to gain insights into your sales performance
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="totalRevenue" className="text-base font-medium">Total Revenue (₹)</Label>
              <Input 
                id="totalRevenue" 
                type="text" 
                value={totalRevenue.toLocaleString('en-IN')} 
                onChange={handleTotalRevenueChange} 
                className="input-field text-lg" 
              />
              <p className="text-sm text-gray-500">Enter your total revenue for the period</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalDeals" className="text-base font-medium">Total Number of Deals</Label>
              <Input 
                id="totalDeals" 
                type="number" 
                value={totalDeals} 
                onChange={handleTotalDealsChange} 
                className="input-field text-lg" 
              />
              <p className="text-sm text-gray-500">Enter the total number of deals closed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparisonDealSize" className="text-base font-medium">Comparison Deal Size (₹)</Label>
              <Input 
                id="comparisonDealSize" 
                type="text" 
                value={comparisonDealSize.toLocaleString('en-IN')} 
                onChange={handleComparisonChange} 
                className="input-field text-lg" 
              />
              <p className="text-sm text-gray-500">Enter a value to compare with (e.g., industry average or previous period)</p>
            </div>
          </div>
          
          <div className="bg-secondary/10 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold text-primary mb-4">Calculation Result</h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Your Average Deal Size</p>
              <p className="text-3xl font-bold text-primary">
                ₹{formatCurrency(averageDealSize)}
              </p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Difference from Comparison</p>
                <div className="flex items-center">
                  {isPositiveChange ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`font-semibold ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                    {percentageChange.toFixed(2)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {isPositiveChange 
                  ? `Your average deal size is ₹${formatCurrency(difference)} higher than the comparison value.`
                  : `Your average deal size is ₹${formatCurrency(Math.abs(difference))} lower than the comparison value.`
                }
              </p>
            </div>
            
            <div className="mt-auto flex space-x-2">
              <Button 
                variant="default"
                onClick={handleEmail}
                className="flex items-center bg-primary hover:bg-primary/90 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" /> Email Results
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownload}
                className="flex items-center border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-6 border-t flex-col items-start">
          <h4 className="text-lg font-medium text-primary mb-2">Deal Size Performance</h4>
          <div className="w-full h-72">
            <DealSizeChart 
              averageDealSize={averageDealSize} 
              comparisonDealSize={comparisonDealSize} 
            />
          </div>
        </CardFooter>
      </Card>
      
      <EmailForm 
        isOpen={isEmailFormOpen} 
        onClose={closeEmailForm} 
        calculationData={calculationData}
      />
    </div>
  );
};

export default AverageDealSizeCalculator;
