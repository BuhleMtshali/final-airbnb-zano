import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchListing, updateListing } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, XIcon } from 'lucide-react';
export const UpdateListing = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    price: '',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    guests: 1,
    amenities: {
      wifi: false,
      kitchen: false,
      parking: false,
      pool: false,
      airConditioning: false,
      washer: false,
      dryer: false,
      tv: false,
      heating: false,
      workspace: false
    }
  });
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = await fetchListing(id);
        // Check if this listing belongs to the current user
        if (listingData.hostId !== user.uid) {
          setError('You do not have permission to edit this listing');
          return;
        }
        setFormData({
          title: listingData.title || '',
          description: listingData.description || '',
          category: listingData.category || '',
          address: listingData.address || '',
          city: listingData.city || '',
          state: listingData.state || '',
          zipCode: listingData.zipCode || '',
          country: listingData.country || '',
          price: listingData.price || '',
          bedrooms: listingData.bedrooms || 1,
          beds: listingData.beds || 1,
          bathrooms: listingData.bathrooms || 1,
          guests: listingData.guests || 1,
          amenities: listingData.amenities || {
            wifi: false,
            kitchen: false,
            parking: false,
            pool: false,
            airConditioning: false,
            washer: false,
            dryer: false,
            tv: false,
            heating: false,
            workspace: false
          }
        });
        // Convert image URLs to our format
        if (listingData.imageUrls && listingData.imageUrls.length > 0) {
          const formattedImages = listingData.imageUrls.map((url, index) => ({
            id: `existing-${index}`,
            url: url
          }));
          setImages(formattedImages);
        }
      } catch (err) {
        setError('Failed to load listing data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getListing();
  }, [id, user]);
  // For demo purposes, let's create some mock data
  useEffect(() => {
    // This simulates fetching data from an API
    const mockListing = {
      id: '101',
      title: 'Modern Downtown Apartment',
      description: 'Stylish apartment in the heart of downtown with amazing city views.',
      category: 'city',
      address: '123 Main St',
      city: 'Seattle',
      state: 'Washington',
      zipCode: '98101',
      country: 'US',
      price: '120',
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      guests: 4,
      amenities: {
        wifi: true,
        kitchen: true,
        parking: true,
        pool: false,
        airConditioning: true,
        washer: true,
        dryer: true,
        tv: true,
        heating: true,
        workspace: true
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
      ],
      hostId: user?.uid // Ensure this listing belongs to the current user
    };
    setFormData({
      title: mockListing.title,
      description: mockListing.description,
      category: mockListing.category,
      address: mockListing.address,
      city: mockListing.city,
      state: mockListing.state,
      zipCode: mockListing.zipCode,
      country: mockListing.country,
      price: mockListing.price,
      bedrooms: mockListing.bedrooms,
      beds: mockListing.beds,
      bathrooms: mockListing.bathrooms,
      guests: mockListing.guests,
      amenities: mockListing.amenities
    });
    const formattedImages = mockListing.imageUrls.map((url, index) => ({
      id: `existing-${index}`,
      url: url
    }));
    setImages(formattedImages);
    setLoading(false);
  }, [user]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        amenities: {
          ...formData.amenities,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a storage service
    // For this demo, we'll create object URLs
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(2),
      url: URL.createObjectURL(file),
      file
    }));
    setImages([...images, ...newImages]);
  };
  const removeImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // In a real app, you would upload new images to storage first
      // Then update the listing data with all image URLs
      const listingData = {
        ...formData,
        id,
        hostId: user.uid,
        imageUrls: images.map(img => img.url),
        updatedAt: new Date().toISOString()
      };
      await updateListing(id, listingData);
      setSuccess(true);
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/my-listings');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to update listing');
    } finally {
      setSubmitting(false);
    }
  };
  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-[#FF5A5F] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <span className="mt-2 text-xs">Basic Info</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-[#FF5A5F]' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-[#FF5A5F] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <span className="mt-2 text-xs">Location</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-[#FF5A5F]' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? 'bg-[#FF5A5F] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <span className="mt-2 text-xs">Details</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep >= 4 ? 'bg-[#FF5A5F]' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= 4 ? 'bg-[#FF5A5F] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              4
            </div>
            <span className="mt-2 text-xs">Photos</span>
          </div>
        </div>
      </div>
    </div>
  );
  const renderBasicInfo = () => (
    <div>
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Listing Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
          placeholder="Give your place a catchy title"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
          placeholder="Describe your place to guests"
          required
        ></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
          required
        >
          <option value="">Select a category</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="lake">Lake</option>
          <option value="countryside">Countryside</option>
          <option value="city">City</option>
          <option value="skiing">Skiing</option>
          <option value="tropical">Tropical</option>
          <option value="historic">Historic</option>
          <option value="cabin">Cabin</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Next: Location
        </button>
      </div>
    </div>
  );
  const renderLocation = () => (
    <div>
      <div className="mb-6">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            Zip/Postal Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="UK">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="AU">Australia</option>
            <option value="JP">Japan</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Next: Details
        </button>
      </div>
    </div>
  );
  const renderDetails = () => (
    <div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price per night (USD)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="focus:ring-[#FF5A5F] focus:border-[#FF5A5F] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
            Beds
          </label>
          <select
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Bathrooms
          </label>
          <select
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          >
            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Maximum Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries({
            wifi: 'WiFi',
            kitchen: 'Kitchen',
            parking: 'Free parking',
            pool: 'Pool',
            airConditioning: 'Air conditioning',
            washer: 'Washer',
            dryer: 'Dryer',
            tv: 'TV',
            heating: 'Heating',
            workspace: 'Dedicated workspace'
          }).map(([key, label]) => (
            <div key={key} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={key}
                  name={key}
                  type="checkbox"
                  checked={formData.amenities[key]}
                  onChange={handleChange}
                  className="focus:ring-[#FF5A5F] h-4 w-4 text-[#FF5A5F] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={key} className="font-medium text-gray-700">
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Next: Photos
        </button>
      </div>
    </div>
  );
  const renderPhotos = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Photos</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add at least 5 photos of your place. High-quality photos attract more guests!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {images.map(image => (
            <div key={image.id} className="relative group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img src={image.url} alt="Listing" className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
          {images.length < 10 && (
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center">
              <label htmlFor="photo-upload" className="cursor-pointer text-center">
                <PlusIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600">Add photo</span>
                <input
                  id="photo-upload"
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </div>
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
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Listing updated successfully! Redirecting...</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting || success}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF4A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] ${
            (submitting || success) ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : success ? 'Updated!' : 'Update Listing'}
        </button>
      </div>
    </div>
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Update Listing
            </h2>
            {renderStepIndicator()}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderBasicInfo()}
              {currentStep === 2 && renderLocation()}
              {currentStep === 3 && renderDetails()}
              {currentStep === 4 && renderPhotos()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};