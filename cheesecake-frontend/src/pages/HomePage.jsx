import React from 'react';
import '../styles/globals.css';
import Section1Home from '../components/Section1Home';
import Section2Home from '../components/Section2Home';
import Section3Home from '../components/Section3Home';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <div>
      {/* <Section1Home /> */}
      <Section2Home />
      <Section3Home />
      <FAQSection />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;