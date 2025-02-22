"use client"

import EcomNavbar from '@/app/components/EcomNavbar';
import Footer from '@/app/components/Footer';
import { useState } from 'react';

export default function TermsPolicy() {
  const [activeSection, setActiveSection] = useState('terms');

  return (
    <>
    <EcomNavbar />

    <div className="">
      <div className="max-w-3xl mx-auto bg-white py-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Terms & Policy
        </h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-2 rounded-lg ${
              activeSection === 'terms'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Terms of Use
          </button>
          <button
            onClick={() => setActiveSection('policy')}
            className={`px-4 py-2 rounded-lg ${
              activeSection === 'policy'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Product Policy
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {activeSection === 'terms' && (
            <div className='px-4'>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Terms of Use
              </h2>
              <p className="text-gray-600 text-justify">
                By accessing our platform, you agree to comply with these terms.
                Our services are provided on an "as-is" basis, and we reserve the
                right to modify or terminate services at any time. You are
                responsible for maintaining the confidentiality of your account
                and for all activities that occur under your account.
              </p>
              <p className="text-gray-600 mt-4 text-justify">
                You may not use our platform for any illegal or unauthorized
                purpose. Violation of these terms may result in termination of
                your access to our services.
              </p>
            </div>
          )}

          {activeSection === 'policy' && (
            <div className='px-4'>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Product Policy
              </h2>
              <p className="text-gray-600 text-justify">
                All eBooks, notes, and other digital products sold on our
                platform are protected by copyright laws. You may not
                redistribute, modify, or sell any content without explicit
                permission from the copyright holder.
              </p>
              <p className="text-gray-600 mt-4 text-justify">
                <strong>No Refunds:</strong> Due to the nature of digital
                products, we do not offer refunds once the product has been
                confirmed and delivered to the user. Please review your purchase
                carefully before completing the transaction.
              </p>
              <p className="text-gray-600 mt-4 text-justify">
                <strong>Usage Restrictions:</strong> To protect intellectual
                property, users are not permitted to download or print the
                eBooks. All access and usage are controlled by the company, and
                any violation of these restrictions may result in legal action.
              </p>
            </div>
          )}
        </div>

        
      </div>
      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}