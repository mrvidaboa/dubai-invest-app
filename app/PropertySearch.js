'use client';

import { useState } from 'react';
import { properties } from './mockPropertyData';
import { useCurrency } from './CurrencyContext';

export default function PropertySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    areaMin: '',
    areaMax: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;
  const { currency, exchangeRates } = useCurrency();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = properties.filter(property => {
      const matchesTerm = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filters.propertyType === '' || property.type === filters.propertyType;
      const matchesPrice = (filters.priceMin === '' || property.price >= Number(filters.priceMin)) &&
                           (filters.priceMax === '' || property.price <= Number(filters.priceMax));
      const matchesBedrooms = filters.bedrooms === '' || property.bedrooms >= Number(filters.bedrooms);
      const matchesBathrooms = filters.bathrooms === '' || property.bathrooms >= Number(filters.bathrooms);
      const matchesArea = (filters.areaMin === '' || property.area >= Number(filters.areaMin)) &&
                          (filters.areaMax === '' || property.area <= Number(filters.areaMax));
      return matchesTerm && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms && matchesArea;
    });

    // Apply sorting
    const sortedResults = sortResults(results);
    setSearchResults(sortedResults);
    setCurrentPage(1);
  };

  const sortResults = (results) => {
    switch (sortOption) {
      case 'price-asc':
        return [...results].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...results].sort((a, b) => b.price - a.price);
      case 'date-desc':
        return [...results].sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
      default:
        return results;
    }
  };

  const convertCurrency = (price) => {
    if (currency === 'AED') return price;
    const rate = exchangeRates[currency] || 1;
    return price * rate;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(convertCurrency(price));
  };

  // Pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Property Search</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter location or property name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            name="priceMin"
            value={filters.priceMin}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            name="priceMax"
            value={filters.priceMax}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="w-full p-2 border rounded"
          />
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Penthouse">Penthouse</option>
          </select>
          <input 
            type="number" 
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            placeholder="Min Bedrooms"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            placeholder="Min Bathrooms"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            name="areaMin"
            value={filters.areaMin}
            onChange={handleFilterChange}
            placeholder="Min Area (sqft)"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            name="areaMax"
            value={filters.areaMax}
            onChange={handleFilterChange}
            placeholder="Max Area (sqft)"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-desc">Newest First</option>
          </select>
        </div>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentResults.map(property => (
          <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{property.title}</h3>
              <p className="text-gray-700 text-base mb-2">{property.location}</p>
              <p className="text-gray-700 text-base mb-2">{formatPrice(property.price)}</p>
              <p className="text-gray-600 text-sm">
                {property.bedrooms} beds • {property.bathrooms} baths • {property.area} sqft
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}