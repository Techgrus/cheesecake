// import React, { useState } from 'react';
// import LoginForm from '../components/LoginForm';
// import SignupForm from '../components/SignupForm';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           {isLogin ? 'Sign in to your account' : 'Create a new account'}
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{' '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             {isLogin ? 'create a new account' : 'sign in to your account'}
//           </button>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {isLogin ? <LoginForm /> : <SignupForm />}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function AuthPage({ isLoggedIn, onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (userData) => {
    onLogin(userData);
    navigate('/home');
  };

  const handleSignup = (userData) => {
    // After successful signup, automatically log the user in
    onLogin(userData);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLoginView ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLoginView ? 'create a new account' : 'sign in to your account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoginView ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <SignupForm onSignup={handleSignup} />
          )}
        </div>
      </div>
    </div>
  );
}
