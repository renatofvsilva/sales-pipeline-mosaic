
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Stage {
  name: string;
  count: number;
  color: string;
}

const SalesPipeline = () => {
  const [viewMode, setViewMode] = useState<'static' | 'cohort'>('static');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [product, setProduct] = useState<string>('all');
  const [campaign, setCampaign] = useState<string>('all');
  const [closedReason, setClosedReason] = useState<string>('all');

  const stages: Stage[] = [
    { name: 'Leads Recebidos', count: 1000, color: 'from-purple-400' },
    { name: 'Tentativa de Conexão', count: 750, color: 'from-purple-500' },
    { name: 'Conectado', count: 500, color: 'from-purple-600' },
    { name: 'Negociando', count: 250, color: 'from-purple-700' },
    { name: 'Venda', count: 100, color: 'from-purple-800' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Sales Pipeline</h1>
          <p className="text-gray-300">Track your sales progress across stages</p>
        </div>

        <Card className="filter-panel mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">View Mode</h3>
              <div className="flex space-x-4">
                <Button
                  variant={viewMode === 'static' ? 'default' : 'outline'}
                  onClick={() => setViewMode('static')}
                  className="w-full"
                >
                  Static
                </Button>
                <Button
                  variant={viewMode === 'cohort' ? 'default' : 'outline'}
                  onClick={() => setViewMode('cohort')}
                  className="w-full"
                >
                  Cohort
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Filters</h3>
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={setProduct} defaultValue={product}>
                  <SelectTrigger>
                    <SelectValue placeholder="Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setCampaign} defaultValue={campaign}>
                  <SelectTrigger>
                    <SelectValue placeholder="Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="campaign1">Campaign 1</SelectItem>
                    <SelectItem value="campaign2">Campaign 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Date Range</h3>
              <div className="flex space-x-4">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="funnel-container">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div
                className={`funnel-stage glass-card bg-gradient-to-r ${stage.color} to-purple-900`}
                style={{
                  width: `${100 - index * 10}%`,
                  opacity: 0.9 - index * 0.1,
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stage.name}
                </h3>
                <p className="text-2xl font-bold text-white">
                  {stage.count.toLocaleString()}
                </p>
                <div className="text-sm text-gray-300 mt-2">
                  {index > 0 &&
                    `${Math.round(
                      (stage.count / stages[index - 1].count) * 100
                    )}% conversion`}
                </div>
              </div>
              {index < stages.length - 1 && <div className="funnel-arrow" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;
