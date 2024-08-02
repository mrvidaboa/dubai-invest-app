import React from 'react';

export default function PropertyComparison({ properties }) {
  if (properties.length === 0) {
    return <p className="text-gray-600 italic">No properties selected for comparison.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b">Feature</th>
            {properties.map(property => (
              <th key={property.id} className="p-3 border-b">{property.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Price', 'Size', 'Bedrooms', 'Bathrooms'].map(feature => (
            <tr key={feature} className="hover:bg-gray-50">
              <td className="p-3 border-b font-semibold">{feature}</td>
              {properties.map(property => (
                <td key={property.id} className="p-3 border-b">
                  {feature === 'Price' ? `$${property[feature.toLowerCase()].toLocaleString()}` : property[feature.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}