
import React, { useState } from 'react';

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
    <div className="min-h-screen bg-gradient">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sales Pipeline</h1>
          <p className="text-gray-400">Track your sales progress across stages</p>
        </header>

        <div className="filter-panel mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="filter-section">
              <h3 className="text-lg font-semibold mb-4">View Mode</h3>
              <div className="flex gap-2">
                <button 
                  className={`btn ${viewMode === 'static' ? 'active' : ''}`}
                  onClick={() => setViewMode('static')}
                >
                  Static
                </button>
                <button 
                  className={`btn ${viewMode === 'cohort' ? 'active' : ''}`}
                  onClick={() => setViewMode('cohort')}
                >
                  Cohort
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="select"
                >
                  <option value="all">All Products</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                </select>

                <select 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="select"
                >
                  <option value="all">All Campaigns</option>
                  <option value="campaign1">Campaign 1</option>
                  <option value="campaign2">Campaign 2</option>
                </select>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="text-lg font-semibold mb-4">Date Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="date-input"
                />
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="date-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="funnel-container">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div 
                className="funnel-stage fade-in"
                style={{
                  width: `${maxWidth - (widthStep * index)}%`,
                  opacity: 0.9 - (index * 0.1),
                  background: `linear-gradient(to right, ${stage.color}, #2d1b4e)`
                }}
              >
                <h3 className="text-xl font-semibold mb-2">{stage.name}</h3>
                <p className="text-2xl font-bold">{stage.count.toLocaleString()}</p>
                {index > 0 && (
                  <div className="text-sm text-gray-300 mt-2">
                    {Math.round((stage.count / stages[index - 1].count) * 100)}% conversion
                  </div>
                )}
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
