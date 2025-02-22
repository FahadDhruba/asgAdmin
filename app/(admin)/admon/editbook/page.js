"use client";

import { useState, useEffect } from 'react';
import Select from 'react-select';
import FormAction from './FormAction';

export default function EditBook() {
  const [bookArray, setBookArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edLoading, setEdLoading] = useState(false);
  const [error, setError] = useState(null);
  const [BookIdOption, setBookIdOption] = useState(null);
  const [bookEditorial, setBookEditorial] = useState(null);

  const handleChange = (selected) => {
    setBookIdOption(selected);
  };

  useEffect(() => {
    async function fetchEditData() {
      if (BookIdOption) {
        try {
          setEdLoading(true);
          const response = await fetch(`/api/admon/gb/${BookIdOption.bookId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBookEditorial(data.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setEdLoading(false);
        }
      }
    }
    fetchEditData();
  }, [BookIdOption]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admon/cb");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookArray(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4">
      <div className='text-purple-700 text-sm py-3 font-semibold'>
        <span>Admin</span>
        <span className='mx-1'>/</span>
        <span>Edit Book</span>
      </div>
      {
        !loading && (
          <div>
            {bookArray.length > 0 ? (
              <div>
                <Select
                  value={BookIdOption}
                  onChange={handleChange}
                  options={bookArray}
                  isSearchable={true}
                  placeholder="Search or Select a book to edit..."
                  noOptionsMessage={() => "No book found"}
                />
              </div>
            ) : (
              <div>No books found</div>
            )}
          </div>
        )
      }
      {bookEditorial && (
        <main>
          <FormAction bookData={bookEditorial} bookId={BookIdOption.bookId} />
        </main>
      )}
    </div>
  );
}