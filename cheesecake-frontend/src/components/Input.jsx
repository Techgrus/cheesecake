import React from 'react';
import PickupDays from './PickupDays';
import MaxCakesPerWeek from './MaxCakesPerWeek';
import { toast } from 'react-toastify'; // Using react-toastify for toast notifications

const Input = () => {
  const [activeTab, setActiveTab] = React.useState('pickup-days');

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Cake Shop Admin</h1>
      
      <div className="tabs">
        <ul className="flex justify-evenly border-b">
          <li
            onClick={() => setActiveTab('pickup-days')}
            className={`cursor-pointer py-2 px-12 ${activeTab === 'pickup-days' ? 'border-b-2 border-blue-500' : ''}`}
          >
            Pickup Days
          </li>
          <li
            onClick={() => setActiveTab('max-cakes')}
            className={`cursor-pointer py-2 px-12 ${activeTab === 'max-cakes' ? 'border-b-2 border-blue-500' : ''}`}
          >
            Max Cakes Per Week
          </li>
        </ul>

        <div className="pt-4">
          {activeTab === 'pickup-days' && <PickupDays />}
          {activeTab === 'max-cakes' && <MaxCakesPerWeek />}
        </div>
      </div>
    </div>
  );
};

export default Input;
