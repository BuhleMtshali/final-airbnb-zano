import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchListingDetails } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StarIcon, HeartIcon, ShareIcon, MapPinIcon, WifiIcon, CarIcon, TvIcon, HomeIcon } from 'lucide-react';
export const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const details = await fetchListingDetails(id);
        setListing(details);
      } catch (err) {
        setError('Failed to load listing details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getListingDetails();
  }, [id]);
  // For demo purposes, let's create a mock listing
  useEffect(() => {
    // This simulates fetching data from an API
    const mockListing = {
      id,
      title: 'Luxury Apartment with Stunning Views',
      description: 'Experience the ultimate in urban living with this modern, spacious apartment featuring floor-to-ceiling windows that offer breathtaking city views. Located in the heart of downtown, you\'ll be steps away from top restaurants, shopping, and entertainment venues. The open-concept living area is perfect for relaxing or entertaining, while the fully-equipped gourmet kitchen will inspire your inner chef. The bedroom offers a peaceful retreat with a premium king-sized bed and luxury linens. The spa-like bathroom features a rainfall shower and high-end toiletries. Additional amenities include high-speed WiFi, smart TV with streaming services, in-unit washer/dryer, and dedicated workspace. Building amenities include 24/7 security, fitness center, rooftop terrace, and concierge service.',
      host: {
        name: 'Michael',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        isSuperhost: true,
        joinedDate: 'January 2018'
      },
      location: 'New York, New York',
      address: '123 Main St, New York, NY 10001',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
      ],
      price: 200,
      rating: 4.95,
      reviewCount: 124,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: [
        { name: 'Wifi', icon: 'WifiIcon' },
        { name: 'Free parking', icon: 'CarIcon' },
        { name: 'TV', icon: 'TvIcon' },
        { name: 'Kitchen', icon: 'HomeIcon' },
        { name: 'Air conditioning', icon: 'HomeIcon' },
        { name: 'Washer', icon: 'HomeIcon' },
        { name: 'Dryer', icon: 'HomeIcon' },
        { name: 'Heating', icon: 'HomeIcon' }
      ],
      cleaningFee: 50,
      serviceFee: 30
    };
    setListing(mockListing);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    if (listing && checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        const nightsTotal = listing.price * nights;
        const total = nightsTotal + listing.cleaningFee + listing.serviceFee;
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    }
  }, [listing, checkIn, checkOut]);
  const handleReservation = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    // In a real app, this would send the reservation to your backend
    alert(`Reservation submitted for ${checkIn} to ${checkOut} for ${guests} guests`);
    navigate('/reservations');
  };
  const renderAmenityIcon = (iconName) => {
    switch (iconName) {
      case 'WifiIcon':
        return <WifiIcon className="h-5 w-5 text-gray-500" />;
      case 'CarIcon':
        return <CarIcon className="h-5 w-5 text-gray-500" />;
      case 'TvIcon':
        return <TvIcon className="h-5 w-5 text-gray-500" />;
      case 'HomeIcon':
      default:
        return <HomeIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </div>
    );
  }
  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
          <p className="mt-2 text-gray-600">The listing you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white min-h-screen">
      {showAllPhotos ? (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="text-black hover:text-gray-600"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-lg font-medium">All Photos ({listing.images.length})</h3>
              <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.images.map((image, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <img
                    src={image}
                    alt={`${listing.title} - Photo ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-black" fill="currentColor" />
              <span className="ml-1 font-medium">{listing.rating}</span>
              <span className="mx-1">·</span>
              <span className="underline">{listing.reviewCount} reviews</span>
              <span className="mx-1">·</span>
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                {listing.location}
              </span>
            </div>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ShareIcon className="h-4 w-4 mr-1" />
                <span className="underline">Share</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <HeartIcon className="h-4 w-4 mr-1" />
                <span className="underline">Save</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 relative">
            <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 rounded-tl-xl rounded-bl-xl overflow-hidden">
              <img
                src={listing.images[0]}
                alt={`${listing.title} - Main Photo`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:grid grid-cols-2 gap-2">
              {listing.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className={`aspect-w-1 aspect-h-1 overflow-hidden ${
                    index === 0 ? 'rounded-tr-xl' : index === 2 ? 'rounded-br-xl' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${listing.title} - Photo ${index + 2}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-sm font-medium"
            >
              Show all photos
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Entire apartment hosted by {listing.host.name}
                  </h2>
                  <p className="text-gray-600">
                    {listing.maxGuests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.bathrooms} bathroom
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative h-14 w-14">
                    <img
                      src={listing.host.image}
                      alt={listing.host.name}
                      className="rounded-full object-cover"
                    />
                    {listing.host.isSuperhost && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                        <svg className="h-4 w-4 text-[#FF5A5F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-6 border-b border-gray-200">
                <div className="prose max-w-none">
                  <p>{listing.description}</p>
                </div>
              </div>
              <div className="py-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {renderAmenityIcon(amenity.icon)}
                      <span className="ml-3 text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-semibold">${listing.price}</span>
                    <span className="text-gray-600"> night</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-black" fill="currentColor" />
                    <span className="ml-1 font-medium">{listing.rating}</span>
                    <span className="mx-1 text-gray-600">·</span>
                    <span className="text-gray-600">{listing.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                  <div className="grid grid-cols-2">
                    <div className="p-3 border-r border-b border-gray-300">
                      <label htmlFor="check-in" className="block text-xs font-semibold uppercase text-gray-500">
                        Check-in
                      </label>
                      <input
                        type="date"
                        id="check-in"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full border-none p-0 focus:ring-0 text-gray-900"
                      />
                    </div>
                    <div className="p-3 border-b border-gray-300">
                      <label htmlFor="check-out" className="block text-xs font-semibold uppercase text-gray-500">
                        Check-out
                      </label>
                      <input
                        type="date"
                        id="check-out"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border-none p-0 focus:ring-0 text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label htmlFor="guests" className="block text-xs font-semibold uppercase text-gray-500">
                      Guests
                    </label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full border-none p-0 focus:ring-0 text-gray-900"
                    >
                      {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleReservation}
                  className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4A4F] transition-colors"
                >
                  Reserve
                </button>
                <p className="text-center text-gray-500 text-sm mt-2">You won't be charged yet</p>
                {checkIn && checkOut && totalPrice > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="underline">${listing.price} x {Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                      <span>${listing.price * Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Cleaning fee</span>
                      <span>${listing.cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>${listing.serviceFee}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                      <span>Total before taxes</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Login Required</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please login or create an account to make a reservation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#FF5A5F] text-base font-medium text-white hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginPrompt(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};