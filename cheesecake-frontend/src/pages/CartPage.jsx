

///////////////////////////////////////////////////////////////////////////////////

'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import react-datepicker CSS
import { format } from "date-fns"; // Import the date-fns library

export default function CartPage() {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file
  const { user, authenticatedFetch } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalPrice(0);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await authenticatedFetch(BASE_URL + '/api/cart/', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(data.data.items || []);
        setTotalPrice(data.data.total_price || 0);
      } else {
      }
    } catch (error) {
    }
  };

  const addToCart = async (item) => {
    try {
      const requestBody = {
        product_id: item.product_id._id,
        quantity: 1
      };

      const response = await authenticatedFetch(BASE_URL + '/api/cart/addItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
      }
    } catch (error) {
    }
  };

  const removeItem = async (productId) => {
    try {
      const requestBody = {
        product_id: productId
      };

      const response = await authenticatedFetch(BASE_URL + '/api/cart/removeItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
      }
    } catch (error) {
    }
  };

  const handleCheckout = async () => {
    try {
      // Format the selected date to "YYYY-MM-DD"
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      const requestBody = { date: formattedDate }; // Use formatted date
      const response = await authenticatedFetch(BASE_URL + '/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (data.success) {
        setCartItems([]);
        setTotalPrice(0);
        // alert('Checkout successful!');
        window.location.href = data.url; // Redirect to the payment session URL
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred during checkout. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Cart</h2>
        <p>Please log in to view your cart.</p>
        <button
          onClick={() => navigate('/auth')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow-lg mb-28 mt-28">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          item.product_id && (
            <div
              key={`${item.product_id._id}-${index}`}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => removeItem(item.product_id._id)}
                  className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          )
        ))
      )}
      <div className="mt-6">
        <h3 className="font-bold mb-2">Select a Date for Pickup:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()} // Prevent selecting past dates
          className="p-2 border rounded w-full"
          filterDate={date => [0, 6].includes(date.getDay())} // Only allow Sat (6) and Sun (0)
          dayClassName={date =>
            [1, 2, 3, 4, 5].includes(date.getDay())
              ? 'react-datepicker__day--disabled'
              : undefined
          }
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="font-bold">Total: ${totalPrice.toFixed(2)}</div>
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className={`px-4 py-2 ${cartItems.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
            } text-white rounded`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}