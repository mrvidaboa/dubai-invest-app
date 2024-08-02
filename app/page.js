'use client';

import { useState } from 'react';
import CompletedPropertyCalculator from './CompletedPropertyCalculator';
import OffPlanPropertyCalculator from './OffPlanPropertyCalculator';
import PropertySearch from './PropertySearch'; 
import Dashboard from './Dashboard';
import MarketTrends from './MarketTrends';
import CurrencySelector from './CurrencySelector';
import SavedProperties from './SavedProperties';
import PropertyComparison from './PropertyComparison';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [compareProperties, setCompareProperties] = useState([]);

  const addToComparison = (property) => {
    if (compareProperties.length < 3 && !compareProperties.find(p => p.id === property.id)) {
      setCompareProperties([...compareProperties, property]);
    }
  };

  const removeFromComparison = (propertyId) => {
    setCompareProperties(compareProperties.filter(p => p.id !== propertyId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dubai Real Estate Investment Tool</h1>
          <CurrencySelector />
        </div>
      </header>

      <nav className="bg-white shadow-md mt-2">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-4">
            {['dashboard', 'completed', 'offplan', 'search', 'trends', 'saved'].map((tab) => (
              <li key={tab}>
                <button 
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'completed' && <CompletedPropertyCalculator />}
          {activeTab === 'offplan' && <OffPlanPropertyCalculator />}
          {activeTab === 'search' && <PropertySearch />}
          {activeTab === 'trends' && <MarketTrends />}
          {activeTab === 'saved' && <SavedProperties addToComparison={addToComparison} />}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Property Comparison</h2>
          <PropertyComparison properties={compareProperties} />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Properties being compared:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareProperties.map(property => (
                <div key={property.id} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-gray-800">{property.title}</span>
                  <button 
                    onClick={() => removeFromComparison(property.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}