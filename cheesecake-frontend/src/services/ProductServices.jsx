

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useProducts = () => {
  const { authenticatedFetch } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/products`);
      const data = await response.json();

      if (data.success) {
        const products = data.data.map((product) => ({
          ...product,
          imageURL: `${BASE_URL}${product.imageURL}`, // Ensure full URL for image
        }));
        return products;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const addProduct = async (formData) => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};