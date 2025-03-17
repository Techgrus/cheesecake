import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify'; // Importing react-toastify for toast notifications

const MaxCakesPerWeek = () => {
  const [maxCakesPerWeek, setMaxCakesPerWeek] = useState('');
  const { user, authenticatedFetch } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file

  const handleMaxCakesSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) {
      toast.error("Only admins can perform this action."); // Using react-toastify for error messages
      return;
    }
    if (maxCakesPerWeek === '') {
      toast.error("Max cakes per week cannot be empty.");
      return;
    }
    if (maxCakesPerWeek < 0) {
      toast.error("Max cakes per week cannot be negative.");
      return;
    }
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/max-cakes-per-week`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxCakesPerWeek: parseInt(maxCakesPerWeek, 10),
        }),
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Max cakes per week updated successfully!");
        setMaxCakesPerWeek('');
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update max cakes per week.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update max cakes per week.");
    }
  };

  return (
    <form onSubmit={handleMaxCakesSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="maxCakesPerWeek" className="block text-sm font-medium text-gray-700">
          Max Cakes Per Week
        </label>
        <input
          id="maxCakesPerWeek"
          type="number"
          value={maxCakesPerWeek}
          onChange={(e) => setMaxCakesPerWeek(e.target.value)}
          placeholder="10"
          min="0"
          className="border p-2 w-full rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
        Submit Max Cakes
      </button>
    </form>
  );
};

export default MaxCakesPerWeek;