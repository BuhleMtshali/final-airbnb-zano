import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListingCard } from '../components/ListingCard';
import { searchListings } from '../services/api';
import { MapIcon, FilterIcon, SlidersIcon } from 'lucide-react';
export const LocationPage = () => {
  const { location } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const results = await searchListings(location, filters);
        setListings(results);
      } catch (err) {
        setError('Error fetching listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [location, filters]);
  // Mock data for demonstration
  const mockListings = [
    {
      id: '201',
      title: 'Modern Apartment in Downtown',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'],
      price: 200,
      rating: 4.85,
      distance: 1.2
    },
    {
      id: '202',
      title: 'Luxury Penthouse with City Views',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 350,
      rating: 4.95,
      distance: 0.8
    },
    {
      id: '203',
      title: 'Cozy Studio in Chelsea',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 150,
      rating: 4.7,
      distance: 1.5
    },
    {
      id: '204',
      title: 'Historic Brownstone Apartment',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 280,
      rating: 4.9,
      distance: 2.0
    },
    {
      id: '205',
      title: 'Stylish Loft in SoHo',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'],
      price: 320,
      rating: 4.85,
      distance: 1.0
    },
    {
      id: '206',
      title: 'Modern Condo with Rooftop Access',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'],
      price: 250,
      rating: 4.75,
      distance: 1.8
    }
  ];
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  const applyFilters = () => {
    // In a real app, this would trigger a new search
    setShowFilters(false);
  };
  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: 'all',
    });
    setShowFilters(false);
  };
  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-[80px] z-40 bg-white shadow-sm py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Places to stay in {location}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <MapIcon className="h-4 w-4 mr-2" />
                {showMap ? 'Hide map' : 'Show map'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowFilters(false)}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 px-4 sm:px-6">
                    <form>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Price range</h3>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                                Min Price
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  type="number"
                                  name="minPrice"
                                  id="minPrice"
                                  value={filters.minPrice}
                                  onChange={handleFilterChange}
                                  className="focus:ring-[#FF5A5F] focus:border-[#FF5A5F] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                                Max Price
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  type="number"
                                  name="maxPrice"
                                  id="maxPrice"
                                  value={filters.maxPrice}
                                  onChange={handleFilterChange}
                                  className="focus:ring-[#FF5A5F] focus:border-[#FF5A5F] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="1000+"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Rooms and beds</h3>
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                                Bedrooms
                              </label>
                              <select
                                id="bedrooms"
                                name="bedrooms"
                                value={filters.bedrooms}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F] sm:text-sm rounded-md"
                              >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                                Bathrooms
                              </label>
                              <select
                                id="bathrooms"
                                name="bathrooms"
                                value={filters.bathrooms}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F] sm:text-sm rounded-md"
                              >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                                <option value="2.5">2.5</option>
                                <option value="3+">3+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Property type</h3>
                          <div className="mt-2">
                            <select
                              id="propertyType"
                              name="propertyType"
                              value={filters.propertyType}
                              onChange={handleFilterChange}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F] sm:text-sm rounded-md"
                            >
                              <option value="all">All types</option>
                              <option value="apartment">Apartment</option>
                              <option value="house">House</option>
                              <option value="condo">Condo</option>
                              <option value="hotel">Hotel room</option>
                              <option value="guesthouse">Guesthouse</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={applyFilters}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                        >
                          Apply filters
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${showMap ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : mockListings.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No listings found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map((listing) => (
                  <ListingCard 
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    location={listing.location}
                    images={listing.images}
                    price={listing.price}
                    rating={listing.rating}
                    distance={listing.distance}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {showMap && (
          <div className="sticky top-[144px] h-[calc(100vh-144px)] bg-gray-200">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="h-16 w-16 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">Map view would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};