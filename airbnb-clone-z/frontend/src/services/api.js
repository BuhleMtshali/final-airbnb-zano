// This is a mock API service for the Airbnb clone
// In a real application, these functions would make actual API calls to your backend
// Mock delay to simulate network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Fetch featured listings for the home page
export const fetchFeaturedListings = async () => {
  await delay(800);
  // This would normally return data from an API call
  return []; // Mock data is handled in the Home component
};
// Search for listings by location
export const searchListings = async (location, filters = {}) => {
  await delay(1000);
  // This would normally filter based on the location and filters
  return []; // Mock data is handled in the LocationPage component
};
// Fetch details for a specific listing
export const fetchListingDetails = async (id) => {
  await delay(800);
  // This would normally return data from an API call with the specific ID
  return null; // Mock data is handled in the LocationDetails component
};
// Fetch listings created by a specific user
export const fetchUserListings = async (userId) => {
  await delay(800);
  // This would normally return data from an API call filtered by userId
  return []; // Mock data is handled in the ViewListings component
};
// Fetch reservations made by a specific user
export const fetchUserReservations = async (userId) => {
  await delay(800);
  // This would normally return data from an API call filtered by userId
  return []; // Mock data is handled in the Reservations component
};
// Create a new listing
export const createListing = async (listingData) => {
  await delay(1000);
  // This would normally send the listing data to your API
  console.log('Creating listing:', listingData);
  return { id: 'new-listing-id', ...listingData };
};
// Update an existing listing
export const updateListing = async (id, listingData) => {
  await delay(1000);
  // This would normally send the updated data to your API
  console.log('Updating listing:', id, listingData);
  return { id, ...listingData };
};
// Delete a listing
export const deleteListing = async (id) => {
  await delay(800);
  // This would normally send a delete request to your API
  console.log('Deleting listing:', id);
  return { success: true };
};
// Make a reservation
export const createReservation = async (reservationData) => {
  await delay(1000);
  // This would normally send the reservation data to your API
  console.log('Creating reservation:', reservationData);
  return { id: 'new-reservation-id', ...reservationData };
};
// Cancel a reservation
export const cancelReservation = async (id) => {
  await delay(800);
  // This would normally send a cancellation request to your API
  console.log('Cancelling reservation:', id);
  return { success: true };
};
// Fetch a single listing (for update page)
export const fetchListing = async (id) => {
  await delay(800);
  // This would normally return data from an API call with the specific ID
  return null; // Mock data is handled in the UpdateListing component
};