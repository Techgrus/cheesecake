import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify'; // Using react-toastify for toast notifications

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PickupDays = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file
  const [pickupDays, setPickupDays] = useState('');
  const { user, authenticatedFetch } = useContext(UserContext);

  useEffect(() => {
    fetchPickupDays();
  }, []);

  const fetchPickupDays = async () => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/pick-up-days`);
      const data = await response.json();
      if (data && data.value) {
        setPickupDays(data.value);
        setSelectedDays(data.value.split(',').map(day => day.trim()));
      } else {
        setPickupDays('');
        setSelectedDays([]);
      }
    } catch (error) {
      toast.error("Failed to fetch pickup days.");
    }
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handlePickupDaysSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) {
      toast.error("Only admins can perform this action.");
      return;
    }
    if (selectedDays.length === 0) {
      toast.error("Pickup days are required.");
      return;
    }
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/pick-up-days`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'pickup_days',
          value: selectedDays.join(','),
        }),
      });
      if (response.status === 201) {
        toast.success("Pickup days created/updated successfully!");
        fetchPickupDays();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to create/update pickup days.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create/update pickup days.");
    }
  };

  const handleDeletePickupDay = async () => {
    if (!user?.isAdmin) {
      toast.error("Only admins can perform this action.");
      return;
    }
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/pick-up-days`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        toast.success("Pickup days deleted successfully!");
        fetchPickupDays();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete pickup days.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete pickup days.");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handlePickupDaysSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Pickup Days</label>
          <div className="grid grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <input
                  id={day}
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="h-4 w-4"
                />
                <label htmlFor={day} className="text-sm">{day}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
          Submit Pickup Days
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Pickup Days List</h2>
        {pickupDays && (
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span>pickup_days: {pickupDays}</span>
            <button
              onClick={handleDeletePickupDay}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupDays;