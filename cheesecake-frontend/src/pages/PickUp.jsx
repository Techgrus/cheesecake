import React, { useEffect, useState } from "react";
import SeasonalMenu from "../components/SeasonalMenu";
import Line from "../components/Line";

const PickUp = () => {
  const [menuItems, setMenuItems] = useState([]);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        console.log(response)
        if (data.success) {
          // Map the data to match the format expected by SeasonalMenu
          const formattedItems = data.data.map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            tags: item.tags || [], // Optional tags
            imageUrl: `${BASE_URL}${item.imageURL}`, // Construct the full image URL
          }));
          setMenuItems(formattedItems);
        } else {
        }
      } 
      catch (error) {

      }

    };

    fetchMenuItems();
  }, []);

  return (
    <section className="mt-16 md:mx-4 mx-2 md:px-4 px-2 py-8 mb-12">
      <Line />
      <SeasonalMenu menuItems={menuItems} />
    </section>
  );
};

export default PickUp;
