import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from 'lucide-react';
export const ListingCard = ({ 
  id, 
  title, 
  location, 
  images, 
  price, 
  rating, 
  startDate, 
  endDate, 
  totalPrice,
  distance,
  category 
}) => {
  return (
    <Link to={`/listings/${id}`} className="block">
      <div className="relative">
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <img 
            src={images[0]} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 hover:bg-white">
            <HeartIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            <h3 className="font-medium text-base text-gray-900 truncate">{location}</h3>
            {rating && (
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-black" fill="currentColor" />
                <span className="ml-1 text-sm">{rating}</span>
              </div>
            )}
          </div>
          {distance && (
            <p className="text-sm text-gray-500">{distance} kilometers away</p>
          )}
          {(startDate && endDate) && (
            <p className="text-sm text-gray-500">{startDate} - {endDate}</p>
          )}
          {category && (
            <p className="text-sm text-gray-500 mt-1">{category}</p>
          )}
          <p className="mt-1">
            <span className="font-semibold">${price}</span>
            <span className="text-gray-600"> night</span>
          </p>
          {totalPrice && (
            <p className="text-sm text-gray-500 mt-1">
              ${totalPrice} total
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};