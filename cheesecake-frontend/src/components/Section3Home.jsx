
// export default Section3Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menulist from './Menulist';

const Section3Home = () => {
  const [products, setProducts] = useState([]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        const enrichedProducts = response.data.data.map((product, index) => ({
          countId: index + 1, // Use 1-based indexing for count
          id: product._id, // Pass the original product ID
          heading: product.name,
          img: `${BASE_URL}${product.imageURL}`, // Prepend BASE_URL to imageURL
          text: product.description || 'No description provided.',
          bg: undefined, // First product gets a background color
        }));
        setProducts(enrichedProducts);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="w-full mt-8 sm:mt-12 lg:mt-20">
      <div className="px-4 sm:px-6 lg:px-9 w-full">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <h1 className="text-4xl sm:text-6xl lg:text-[96px] figtree-900">Seasonal Menu</h1>
            <div className="h-[47px] px-4 sm:px-[22px] py-2.5 bg-[#ff0099]/10 rounded-[3px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-base sm:text-lg lg:text-[22px] font-normal font-['Montserrat']">
                Total Products: {products.length}
              </div>
            </div>
          </div>
          <div>
            <Menulist arr={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3Home;
