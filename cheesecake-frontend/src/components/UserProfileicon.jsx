

// export default UserProfileIcon;



import React, { useState, useContext } from 'react';
import { User } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (isOpen && !e.target.closest('.profile-menu')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative profile-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative md:h-12  md:w-12 h-8 w-8 rounded-full  flex items-center justify-center "
      >
        {user?.profileImage ? (
          <img 
            src={`${BASE_URL}${user.profileImage}`}
            alt={user.name || 'User profile'} 
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <User className="md:h-8 md:w-8 w-6 h-6 text-white" strokeWidth={1.7} />
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ 
            border: '1px solid #e5e7eb',
            top: '100%'
          }}
        >
          <div className="flex flex-col items-center gap-4 p-4">
            {user ? (
              <>
                <div className="md:h-16 md:w-16 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {user.profileImage ? (
                    <img 
                      src={`${BASE_URL}${user.profileImage}`}
                      alt={user.name || 'User profile'} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="md:h-8 md:w-8 w-6 h-6 text-gray-600" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 text-center">
                  Please log in to access your profile
                </p>
                <button 
                  onClick={handleLogin}
                  className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;