'use client';
import React, { useState } from 'react';
import { properties } from './dummyData';

export default function SavedProperties({ addToComparison }) {
  const [savedProperties, setSavedProperties] = useState([]);

  const saveProperty = (property) => {
    if (!savedProperties.find(p => p.id === property.id)) {
      setSavedProperties([...savedProperties, property]);
    }
  };

  const removeProperty = (propertyId) => {
    setSavedProperties(savedProperties.filter(p => p.id !== propertyId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h3>
            <p className="text-gray-600 mb-4">Price: ${property.price.toLocaleString()}</p>
            <div className="flex justify-between">
              <button 
                onClick={() => saveProperty(property)}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Save Property
              </button>
              <button 
                onClick={() => addToComparison(property)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Saved Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h3>
            <p className="text-gray-600 mb-4">Price: ${property.price.toLocaleString()}</p>
            <div className="flex justify-between">
              <button 
                onClick={() => removeProperty(property.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
              <button 
                onClick={() => addToComparison(property)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}