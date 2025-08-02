import React from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon } from 'lucide-react';
export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Safety information</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Cancellation options</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Our COVID-19 Response</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Supporting people with disabilities</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Community</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Airbnb.org: disaster relief housing</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Support Afghan refugees</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Celebrating diversity & belonging</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Combating discrimination</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Hosting</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Try hosting</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">AirCover: protection for Hosts</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Explore hosting resources</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Visit our community forum</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">How to host responsibly</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">About</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Newsroom</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Learn about new features</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Letter from our founders</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
              <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Investors</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
              <p className="text-gray-500 text-base">&copy; 2023 Airbnb, Inc.</p>
              <div className="flex space-x-4 mt-2 md:mt-0 md:ml-4">
                <Link to="#" className="text-gray-500 hover:text-gray-900 text-base">Privacy</Link>
                <Link to="#" className="text-gray-500 hover:text-gray-900 text-base">Terms</Link>
                <Link to="#" className="text-gray-500 hover:text-gray-900 text-base">Sitemap</Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-6">
                <GlobeIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-500 text-base">English (US)</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-base mr-2">$</span>
                <span className="text-gray-500 text-base">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};