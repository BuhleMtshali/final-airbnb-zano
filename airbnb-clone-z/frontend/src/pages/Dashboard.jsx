import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserListings, fetchUserReservations } from '../services/api';
import { HomeIcon, CalendarIcon, PlusCircleIcon, ListIcon } from 'lucide-react';
export const Dashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would use the actual user ID
        const userListings = await fetchUserListings(user.uid);
        const userReservations = await fetchUserReservations(user.uid);
        setListings(userListings);
        setReservations(userReservations);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  // Mock data for demonstration
  const mockListings = [
    {
      id: '101',
      title: 'Modern Downtown Apartment',
      location: 'Seattle, Washington',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: 120,
      rating: 4.8,
      bookings: 12
    },
    {
      id: '102',
      title: 'Cozy Beach Cottage',
      location: 'San Diego, California',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: 200,
      rating: 4.9,
      bookings: 28
    }
  ];
  const mockReservations = [
    {
      id: '201',
      listingTitle: 'Mountain Retreat with Hot Tub',
      location: 'Denver, Colorado',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      startDate: '2023-10-15',
      endDate: '2023-10-20',
      totalPrice: 950
    },
    {
      id: '202',
      listingTitle: 'Lakefront Cabin',
      location: 'Lake Tahoe, California',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      startDate: '2023-11-05',
      endDate: '2023-11-10',
      totalPrice: 1200
    }
  ];
  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Your Listings</h3>
          <Link to="/my-listings" className="text-sm font-medium text-[#FF5A5F] hover:text-[#FF4A4F]">
            View all
          </Link>
        </div>
        {mockListings.length > 0 ? (
          <div className="space-y-4">
            {mockListings.slice(0, 2).map((listing) => (
              <div key={listing.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {listing.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {listing.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${listing.price}</p>
                  <p className="text-sm text-gray-500">{listing.bookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">You have no listings yet.</p>
            <Link 
              to="/create-listing" 
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F]"
            >
              Create a Listing
            </Link>
          </div>
        )}
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Trips</h3>
          <Link to="/reservations" className="text-sm font-medium text-[#FF5A5F] hover:text-[#FF4A4F]">
            View all
          </Link>
        </div>
        {mockReservations.length > 0 ? (
          <div className="space-y-4">
            {mockReservations.slice(0, 2).map((reservation) => (
              <div key={reservation.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                  <img 
                    src={reservation.image} 
                    alt={reservation.listingTitle}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {reservation.listingTitle}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {reservation.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{reservation.startDate}</p>
                  <p className="text-sm text-gray-500">to {reservation.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">You have no upcoming trips.</p>
            <Link 
              to="/" 
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F]"
            >
              Explore Places to Stay
            </Link>
          </div>
        )}
      </div>
      <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/create-listing"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <PlusCircleIcon className="h-8 w-8 text-[#FF5A5F] mb-2" />
            <span className="text-sm font-medium text-gray-900">Create New Listing</span>
          </Link>
          <Link 
            to="/my-listings"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ListIcon className="h-8 w-8 text-[#FF5A5F] mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Listings</span>
          </Link>
          <Link 
            to="/reservations"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <CalendarIcon className="h-8 w-8 text-[#FF5A5F] mb-2" />
            <span className="text-sm font-medium text-gray-900">View Reservations</span>
          </Link>
        </div>
      </div>
    </div>
  );
  const renderListingsTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Your Listings</h3>
        <Link 
          to="/create-listing" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F]"
        >
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add New Listing
        </Link>
      </div>
      {mockListings.length > 0 ? (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Listing</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bookings</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                        <img src={listing.image} alt={listing.title} className="h-10 w-10 object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{listing.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{listing.location}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${listing.price}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{listing.rating}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{listing.bookings}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link to={`/update-listing/${listing.id}`} className="text-[#FF5A5F] hover:text-[#FF4A4F] mr-4">
                      Edit
                    </Link>
                    <button className="text-gray-500 hover:text-gray-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No listings</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new listing.</p>
          <div className="mt-6">
            <Link
              to="/create-listing"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
            >
              <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Listing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
  const renderReservationsTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Your Trips</h3>
      {mockReservations.length > 0 ? (
        <div className="space-y-6">
          {mockReservations.map((reservation) => (
            <div key={reservation.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
              <div className="h-48 md:h-auto md:w-48 flex-shrink-0">
                <img 
                  src={reservation.image} 
                  alt={reservation.listingTitle} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{reservation.listingTitle}</h4>
                  <p className="text-sm text-gray-500">{reservation.location}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <p>
                      {reservation.startDate} - {reservation.endDate}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total: ${reservation.totalPrice}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-[#FF5A5F] hover:bg-[#FF4A4F]">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No trips booked</h3>
          <p className="mt-1 text-sm text-gray-500">Start exploring and book your next adventure.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
            >
              Explore Places to Stay
            </Link>
          </div>
        </div>
      )}
    </div>
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.displayName || 'User'}!</h1>
          <p className="text-gray-600">Manage your listings and reservations</p>
        </div>
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`${
                activeTab === 'listings'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Your Listings
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`${
                activeTab === 'reservations'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Your Trips
            </button>
          </nav>
        </div>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'listings' && renderListingsTab()}
        {activeTab === 'reservations' && renderReservationsTab()}
      </div>
    </div>
  );
};