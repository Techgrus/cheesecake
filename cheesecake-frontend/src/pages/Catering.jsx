import React from 'react';
import Section1Home from '../components/Section1Home';
import EventsAndCatering from '../components/Events';
import ContactUs from '../components/ContactUsForm';
import Footer from '../components/Footer';

const Catering = () => {
  return (
    <section className='md:mt-28 mt-10'>
      <EventsAndCatering />
      <ContactUs className = "mt-32" />
    </section>
  );
};

export default Catering;