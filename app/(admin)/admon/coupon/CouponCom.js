"use client";

import { useState, useEffect } from "react";

export default function PromoCodesPage() {
    const [promoCodes, setPromoCodes] = useState([]);
    const [newCode, setNewCode] = useState("");
    const [newDiscount, setNewDiscount] = useState("");
    const [newValidUntil, setNewValidUntil] = useState("");
    const [newBooks, setNewBooks] = useState([]);
    const [bookOptions, setBookOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const [newMaxUseTime, setNewMaxUseTime] = useState("");

    // Fetch promo codes from the API
    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await fetch('/api/admon/coupon');
                const data = await response.json();
                setPromoCodes(data.data);
            } catch (error) {
                console.error('Error fetching promo codes:', error);
            }
        };

        fetchPromoCodes();
    }, []);

    // Fetch book options from the API
    useEffect(() => {
        const fetchBookOptions = async () => {
            try {
                const response = await fetch('/api/admon/ab');
                const data = await response.json();
                setBookOptions(data.data);
            } catch (error) {
                console.error('Error fetching book options:', error);
            }
        };

        fetchBookOptions();
    }, []);

    // Function to add a new promo code
    const addPromoCode = async () => {
        if (!newCode || !newDiscount || !newValidUntil || !newMaxUseTime) {
            setError("Please fill in all fields.");
            return;
        }

        setIsAdding(true);
        setError("");

        const newPromoCode = {
            code: newCode.toLowerCase(),
            disc: Number(newDiscount),
            validUntil: newValidUntil,
            availerBunch: newBooks,
            maxUseTime: Number(newMaxUseTime),
        };

        try {
            const response = await fetch('/api/admon/coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPromoCode),
            });

            if (response.ok) {
                const data = await response.json();
                setPromoCodes(data.data);
                setNewCode("");
                setNewDiscount("");
                setNewValidUntil("");
                setNewBooks([]);
                setNewMaxUseTime("");
            } else {
                setError('Error adding promo code. Please try again.');
            }
        } catch (error) {
            setError('Error adding promo code. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    // Function to delete (disable) a promo code
    const deletePromoCode = async (id) => {
        try {
            const response = await fetch('/api/admon/coupon', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                const data = await response.json();
                setPromoCodes(data.data);
            } else {
                console.error('Error disabling promo code:', response.statusText);
            }
        } catch (error) {
            console.error('Error disabling promo code:', error);
        }
    };

    // Filter book options based on search term
    const filteredBookOptions = bookOptions.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Add New Promo Code Form */}
            <div className="bg-white rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-6">Add New Promo Code</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    <input
                        type="text"
                        placeholder="Promo Code"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Discount in taka"
                        value={newDiscount}
                        onChange={(e) => setNewDiscount(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="datetime-local"
                        value={newValidUntil}
                        onChange={(e) => setNewValidUntil(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Maximum Use Time"
                        value={newMaxUseTime}
                        onChange={(e) => setNewMaxUseTime(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Books"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            multiple
                            value={newBooks}
                            onChange={(e) => setNewBooks(Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {filteredBookOptions.map((book) => (
                                <option key={book.bookId} value={book.bookId}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={addPromoCode}
                    disabled={isAdding}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isAdding ? "Adding..." : "Add Promo Code"}
                </button>
            </div>

            {/* Promo Codes List */}
            <div className="bg-white rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Active Promo Codes</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-center text-sm">
                            <th className="py-2 px-1 font-medium">Code</th>
                            <th className="py-2 px-1 font-medium">Discount</th>
                            <th className="py-2 px-1 font-medium">Validity</th>
                            <th className="py-2 px-1 font-medium">Used</th>
                            <th className="py-2 px-1 font-medium">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promoCodes.map((code, index) => (
                            <tr key={index} className="border-b  text-sm text-center hover:bg-gray-50">
                                <td className="py-2 px-1 font-bold">{code.code.toUpperCase()}</td>
                                <td className="py-2 px-1">{code.disc}৳</td>
                                <td className="py-2 px-1 text-xs">{new Date(code.validUntil).toLocaleString()}</td>
                                <td className="py-2 px-1">{code.count}/{code.maxUseTime}</td>
                                <td className="py-2 px-1">
                                    <button
                                        onClick={() => deletePromoCode(code._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}