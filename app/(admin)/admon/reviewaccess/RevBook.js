"use client";
import { useEffect, useState } from 'react';

export default function RevBook() {
  const [data, setData] = useState({ pending: [], solved: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/aqquirepurchase');
        const result = await response.json();
        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleGiveAccess = async (email, id) => {
    try {
      const response = await fetch('/api/admon/manualaccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, _id: id }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to give access');
      }
      alert('Access granted successfully');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail) {
      alert('Please enter an email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(searchEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/admon/searchuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchEmail }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch user data');
      }
      setSearchResult(result.data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <main className="flex justify-center items-center h-screen bg-gray-50">Loading...</main>;
  if (error) return <main className="flex justify-center items-center h-screen bg-gray-50">Error: {error}</main>;

  return (
    <main className="">
      <div className='w-full md:w-1/2'>
        <h1 className="text-xl font-bold mb-4 text-gray-800">Search & Access</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Email Address..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {searchResult && (
          <div className="bg-gray-50 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="text-md font-semibold text-gray-700">{searchResult.email}</p>
            <p className="text-sm text-gray-500 mt-1">{searchResult.name}</p>
            {searchResult.uid && (
              <p className="text-xs text-gray-400 mt-1">
                {searchResult.uid}
              </p>
            )}
            {searchResult.pur === "havent" && (
              <div className="mt-3 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  onClick={() => handleGiveAccess(searchResult.email, "ccv")}
                >
                  Give Access
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-300 transition-colors">
                  See Details
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <h1 className="text-xl font-bold mb-4 text-gray-800">Pending Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pending.map((req, index) => (
          <div key={index} className="bg-gray-50 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="text-md font-semibold text-gray-700">{req.email}</p>
            <p className="text-sm font-bold text-orange-500 mt-1">{req.status}</p>
            <p className="text-xs text-gray-500 mt-1">{req.probType}</p>
            {req.time && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(req.time).toLocaleString()}
              </p>
            )}
            <div className="mt-3 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600 transition-colors"
                onClick={() => handleGiveAccess(req.email, req._id)}
              >
                Give Access
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-300 transition-colors">
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-xl font-bold mt-8 mb-4 text-gray-800">Solved Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.solved.map((req, index) => (
          <div key={index} className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="text-md font-semibold text-gray-700">{req.email}</p>
            <p className="text-sm text-gray-500 mt-1">{req.status}</p>
            {req.time && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(req.time).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}