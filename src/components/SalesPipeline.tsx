
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const stages = [
  { name: 'Leads Recebidos', count: 1000, color: '#9b87f5' },
  { name: 'Tentativa de Conexão', count: 750, color: '#8b77e5' },
  { name: 'Conectado', count: 500, color: '#7b67d5' },
  { name: 'Negociando', count: 250, color: '#6b57c5' },
  { name: 'Venda', count: 100, color: '#5b47b5' }
];

const SalesPipeline = () => {
  const [viewMode, setViewMode] = useState('static');
  const [product, setProduct] = useState('all');
  const [campaign, setCampaign] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const maxWidth = 100;
  const minWidth = 40;
  const widthStep = (maxWidth - minWidth) / (stages.length - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sales Pipeline</h1>
          <p className="text-gray-400">Track your sales progress across stages</p>
        </header>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">View Mode</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('static')}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors",
                    viewMode === 'static' 
                      ? "bg-purple-600 border-purple-500 text-white" 
                      : "border-gray-600 text-gray-300 hover:bg-purple-600/20"
                  )}
                >
                  Static
                </button>
                <button 
                  onClick={() => setViewMode('cohort')}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors",
                    viewMode === 'cohort' 
                      ? "bg-purple-600 border-purple-500 text-white" 
                      : "border-gray-600 text-gray-300 hover:bg-purple-600/20"
                  )}
                >
                  Cohort
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="all">All Products</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                </select>

                <select 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="all">All Campaigns</option>
                  <option value="campaign1">Campaign 1</option>
                  <option value="campaign2">Campaign 2</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Date Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div 
                className="relative w-full p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  width: `${maxWidth - (widthStep * index)}%`,
                  background: `linear-gradient(to right, ${stage.color}, #2d1b4e)`,
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{stage.name}</h3>
                <p className="text-2xl font-bold text-white">{stage.count.toLocaleString()}</p>
                {index > 0 && (
                  <div className="text-sm text-gray-300 mt-2">
                    {Math.round((stage.count / stages[index - 1].count) * 100)}% conversion
                  </div>
                )}
              </div>
              {index < stages.length - 1 && (
                <div className="w-0 h-0 mx-auto border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-purple-500/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;
