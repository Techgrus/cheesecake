// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './styles/globals.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// // )
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
// import './styles/globals.css';
// import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router> {/* Wrap the App with BrowserRouter */}
//       <App />
//     </Router>
//   </StrictMode>
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './styles/globals.css';
import '@fontsource/figtree';
import '@fontsource/montserrat';
import  App  from './App.jsx';  // Use named import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap the App with BrowserRouter */}
      <App />
    </Router>
  </StrictMode>
);
