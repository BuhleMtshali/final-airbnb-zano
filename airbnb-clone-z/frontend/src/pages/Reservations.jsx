import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserReservations, cancelReservation } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, MapPinIcon, TrashIcon } from 'lucide-react';
export const Reservations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  useEffect(() => {
    const getReservations = async () => {
      try {
        // In a real app, this would use the actual user ID
        const userReservations = await fetchUserReservations(user.uid);
        setReservations(userReservations);
      } catch (err) {
        setError('Failed to fetch your reservations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getReservations();
  }, [user]);
  // Mock data for demonstration
  const mockReservations = [
    {
      id: '301',
      listingId: '201',
      listingTitle: 'Luxury Apartment with Stunning Views',
      location: 'New York, New York',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
      checkIn: '2023-11-15',
      checkOut: '2023-11-20',
      guests: 2,
      totalPrice: 1250,
      status: 'upcoming'
    },
    {
      id: '302',
      listingId: '202',
      listingTitle: 'Mountain Retreat with Hot Tub',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      checkIn: '2023-12-10',
      checkOut: '2023-12-15',
      guests: 4,
      totalPrice: 1800,
      status: 'upcoming'
    },
    {
      id: '303',
      listingId: '203',
      listingTitle: 'Beachfront Villa with Private Pool',
      location: 'Miami, Florida',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      checkIn: '2023-08-05',
      checkOut: '2023-08-12',
      guests: 6,
      totalPrice: 3200,
      status: 'completed'
    },
    {
      id: '304',
      listingId: '204',
      listingTitle: 'Cozy Cabin in the Woods',
      location: 'Portland, Oregon',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      checkIn: '2023-07-20',
      checkOut: '2023-07-25',
      guests: 2,
      totalPrice: 950,
      status: 'cancelled'
    }
  ];
  const confirmCancel = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };
  const handleCancelReservation = async () => {
    try {
      await cancelReservation(reservationToCancel.id);
      // Update the local state to reflect the cancellation
      setReservations(reservations.map(res => 
        res.id === reservationToCancel.id 
          ? { ...res, status: 'cancelled' } 
          : res
      ));
      setShowCancelModal(false);
    } catch (err) {
      setError('Failed to cancel reservation');
      console.error(err);
    }
  };
  const filteredReservations = mockReservations.filter(res => res.status === activeTab);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Trips</h1>
          <p className="text-gray-600">Manage your upcoming, past, and cancelled reservations</p>
        </div>
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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
        )}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`${
                activeTab === 'completed'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`${
                activeTab === 'cancelled'
                  ? 'border-[#FF5A5F] text-[#FF5A5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Cancelled
            </button>
          </nav>
        </div>
        {filteredReservations.length > 0 ? (
          <div className="space-y-6">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48">
                    <img 
                      className="h-full w-full object-cover" 
                      src={reservation.image} 
                      alt={reservation.listingTitle} 
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{reservation.listingTitle}</h3>
                        <div className="flex items-center mt-1 text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{reservation.location}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-6 md:text-right">
                        <p className="text-gray-900 font-medium">${reservation.totalPrice}</p>
                        <p className="text-sm text-gray-500">total price</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-gray-600">
                        {reservation.checkIn} - {reservation.checkOut}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/listings/${reservation.listingId}`)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                        >
                          View Details
                        </button>
                        {activeTab === 'upcoming' && (
                          <button
                            onClick={() => confirmCancel(reservation)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                      {activeTab === 'completed' && (
                        <button
                          className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <CalendarIcon className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} trips</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming trips. Start exploring and book your next adventure!" 
                : activeTab === 'completed'
                ? "You haven't completed any trips yet."
                : "You don't have any cancelled reservations."}
            </p>
            {activeTab === 'upcoming' && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                >
                  Find a place to stay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Reservation</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel your reservation at "{reservationToCancel?.listingTitle}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelReservation}
                >
                  Cancel Reservation
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};