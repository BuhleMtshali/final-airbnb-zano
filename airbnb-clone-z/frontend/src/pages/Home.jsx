import React, { useState, useEffect } from 'react';
import { ListingCard } from '../components/ListingCard';
import { fetchFeaturedListings } from '../services/api';
import { FilterIcon } from 'lucide-react';
export const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = [
    { name: 'all', label: 'All', icon: '🏠' },
    { name: 'beach', label: 'Beach', icon: '🏖️' },
    { name: 'mountain', label: 'Mountain', icon: '⛰️' },
    { name: 'lake', label: 'Lake', icon: '🌊' },
    { name: 'countryside', label: 'Countryside', icon: '🌄' },
    { name: 'city', label: 'City', icon: '🏙️' },
    { name: 'skiing', label: 'Skiing', icon: '⛷️' },
    { name: 'tropical', label: 'Tropical', icon: '🌴' },
    { name: 'historic', label: 'Historic', icon: '🏛️' },
    { name: 'cabin', label: 'Cabin', icon: '🏡' },
  ];
  useEffect(() => {
    const getListings = async () => {
      try {
        const listings = await fetchFeaturedListings();
        setFeaturedListings(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, []);
  // For demo purposes, let's create some mock data
  const mockListings = [
    {
      id: '1',
      title: 'Luxurious Beach House',
      location: 'Malibu, California',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 350,
      rating: 4.98,
      distance: 25,
      category: 'beach'
    },
    {
      id: '2',
      title: 'Modern City Apartment',
      location: 'New York, New York',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'],
      price: 200,
      rating: 4.85,
      distance: 3,
      category: 'city'
    },
    {
      id: '3',
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, Colorado',
      images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 275,
      rating: 4.92,
      distance: 45,
      category: 'mountain'
    },
    {
      id: '4',
      title: 'Lakefront Retreat',
      location: 'Lake Tahoe, Nevada',
      images: ['https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 320,
      rating: 4.89,
      distance: 60,
      category: 'lake'
    },
    {
      id: '5',
      title: 'Historic Downtown Loft',
      location: 'Chicago, Illinois',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 180,
      rating: 4.76,
      distance: 8,
      category: 'city'
    },
    {
      id: '6',
      title: 'Tropical Villa with Pool',
      location: 'Maui, Hawaii',
      images: ['https://images.unsplash.com/photo-1439419237179-1f93db1a4d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 425,
      rating: 4.95,
      distance: 120,
      category: 'tropical'
    },
    {
      id: '7',
      title: 'Rustic Countryside Cottage',
      location: 'Sonoma, California',
      images: ['https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 195,
      rating: 4.88,
      distance: 35,
      category: 'countryside'
    },
    {
      id: '8',
      title: 'Ski-in/Ski-out Chalet',
      location: 'Park City, Utah',
      images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'],
      price: 380,
      rating: 4.91,
      distance: 55,
      category: 'skiing'
    }
  ];
  const filteredListings = activeFilter === 'all' 
    ? mockListings 
    : mockListings.filter(listing => listing.category === activeFilter);
  return (
    <div className="bg-white">
      {/* Category Filter */}
      <div className="sticky top-[80px] z-40 bg-white shadow-sm pt-5 pb-4">
        <div className="flex space-x-8 overflow-x-auto px-8 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveFilter(category.name)}
              className={`flex flex-col items-center space-y-2 min-w-[56px] pb-2 border-b-2 ${
                activeFilter === category.name
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs">{category.label}</span>
            </button>
          ))}
        </div>
        <div className="px-8 pt-4 flex justify-end">
          <button className="flex items-center border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id}
                id={listing.id}
                title={listing.title}
                location={listing.location}
                images={listing.images}
                price={listing.price}
                rating={listing.rating}
                distance={listing.distance}
                category={listing.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};