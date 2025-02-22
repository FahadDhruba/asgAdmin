"use client";

import { useState, useEffect } from 'react';

export default function BookForm() {
  const [tryReadInputs, setTryReadInputs] = useState(['']);
  const [formData, setFormData] = useState({
    bookTitle: '',
    cover: '',
    authors: '',
    price: '',
    mainPrice: '',
    level: '',
    category: '',
    subject: '',
    paper: '',
    chapters: [],
    bookCDNLink: '',
  });

  const [options, setOptions] = useState({
    levels: [],
    categories: [],
    subjects: [],
    papers: [],
    chapters: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/admon/config');
      const data = await response.json();
      const levels = data.data.filter(item => item.type === 'level');
      const categories = data.data.filter(item => item.type === 'category');
      const subjects = data.data.filter(item => item.type === 'subject');
      const papers = data.data.filter(item => item.type === 'paper');
      const chapters = data.data.filter(item => item.type === 'chapter');
      setOptions({ levels, categories, subjects, papers, chapters });
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTryReadChange = (index, value) => {
    const newTryReadInputs = [...tryReadInputs];
    newTryReadInputs[index] = value;
    setTryReadInputs(newTryReadInputs);
  };

  const addTryReadInput = () => {
    setTryReadInputs([...tryReadInputs, '']);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bookTitle) newErrors.bookTitle = 'Book title is required';
    if (!formData.cover) newErrors.cover = 'Cover URL is required';
    if (!formData.authors) newErrors.authors = 'Authors are required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.mainPrice) newErrors.mainPrice = 'Main price is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.paper) newErrors.paper = 'Paper is required';
    if (formData.chapters.length === 0) newErrors.chapters = 'At least one chapter is required';
    if (!formData.bookCDNLink) newErrors.bookCDNLink = 'Book CDN Link is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const finalData = {
      ...formData,
      tryRead: tryReadInputs.filter((input) => input.trim() !== ''),
    };

    try {
      const response = await fetch('/api/admon/cb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Book created successfully!');
      } else {
        console.error('Error:', response.statusText);
        setErrorMessage('Failed to create book. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-white px-4 w-full">

        <div className='text-purple-700 text-sm py-3 font-semibold'>
          <span>Admin</span>
          <span className='mx-1'>/</span>
          <span>Create Book</span>
        </div>

        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
          {/* Book Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.bookTitle && <p className="text-red-500 text-sm">{errors.bookTitle}</p>}
          </div>

          {/* Cover URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cover URL</label>
            <input
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.cover && <p className="text-red-500 text-sm">{errors.cover}</p>}
            {formData.cover && (
              <img src={formData.cover} alt="Book Cover" className="mt-2 mx-auto w-1/2 rounded-md object-cover" />
            )}
          </div>

          {/* Authors */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Authors (comma-separated)</label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.authors && <p className="text-red-500 text-sm">{errors.authors}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          {/* Main Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Main Price</label>
            <input
              type="number"
              name="mainPrice"
              value={formData.mainPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.mainPrice && <p className="text-red-500 text-sm">{errors.mainPrice}</p>}
          </div>

          {/* Level Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Level</option>
              {options.levels.map(level => (
                <option key={level._id} value={level._id}>{level.engName}</option>
              ))}
            </select>
            {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
          </div>

          {/* Category Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Category</option>
              {options.categories.map(category => (
                <option key={category._id} value={category._id}>{category.engName}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Subject Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Subject</option>
              {options.subjects.map(subject => (
                <option key={subject._id} value={subject._id}>{subject.engName}</option>
              ))}
            </select>
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          {/* Paper Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Paper</label>
            <select
              name="paper"
              value={formData.paper}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Paper</option>
              {options.papers.map(paper => (
                <option key={paper._id} value={paper._id}>{paper.engName}</option>
              ))}
            </select>
            {errors.paper && <p className="text-red-500 text-sm">{errors.paper}</p>}
          </div>

          {/* Chapter Selector (Multiple Select) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Chapter (Select Multiple)</label>
            <select
              name="chapters"
              multiple
              value={formData.chapters}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  chapters: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              {options.chapters.map(chapter => (
                <option key={chapter._id} value={chapter._id}>{chapter.engName}</option>
              ))}
            </select>
            {errors.chapters && <p className="text-red-500 text-sm">{errors.chapters}</p>}
          </div>

          {/* Book CDN Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Book CDN Link</label>
            <input
              type="url"
              name="bookCDNLink"
              value={formData.bookCDNLink}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.bookCDNLink && <p className="text-red-500 text-sm">{errors.bookCDNLink}</p>}
          </div>

          {/* Try Read Some (Dynamic Inputs) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Try Read Some</label>
            {tryReadInputs.map((input, index) => (
              <div key={index} className="flex items-center mt-2">
                {tryReadInputs[index] && (
                  <div className='w-6 mr-2'>
                    <img src={tryReadInputs[index]} alt={index} className="object-cover" />
                  </div>
                )}
                <input
                  type="url"
                  value={input}
                  onChange={(e) => handleTryReadChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Page Image URL"
                />
                {index === tryReadInputs.length - 1 && (
                  <button
                    type="button"
                    onClick={addTryReadInput}
                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    +
                  </button>
                )}

              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        </div>
      </form>
    </div>
  );
}