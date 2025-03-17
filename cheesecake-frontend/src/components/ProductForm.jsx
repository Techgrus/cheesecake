import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';

export default function ProductForm({ onClose, onSubmit, product }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageURL: '',
    description:''
  });
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file
  useEffect(() => {
    if (product) {
      // Sanitize the imageURL if it exists
      const sanitizedImageURL = product.imageURL ? sanitizeImageURL(product.imageURL) : '';
      
      setFormData({
        name: product.name,
        price: product.price,
        imageURL: sanitizedImageURL,
        description: product.description
      });
      setPreviewURL(sanitizedImageURL);
    }
  }, [product]);

  // Function to sanitize image URL
  // const sanitizeImageURL = (url) => {
  //   if (!url) return '';
  //   // Remove localhost:5000 if present
  //   return url.replace(/^http:\/\/localhost:5000/i, '');
  // };

  const sanitizeImageURL = (url) => {
    if (!url) return '';
    // Remove BASE_URL if present
    return url.replace(new RegExp(`^${BASE_URL}`, 'i'), '');
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreviewURL(URL.createObjectURL(file));
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Remove spaces from the filename
      const sanitizedFileName = file.name.replace(/\s+/g, '');
      
      // Create a new File object with the sanitized name
      const sanitizedFile = new File([file], sanitizedFileName, {
        type: file.type
      });
  
      setImage(sanitizedFile);
      setPreviewURL(URL.createObjectURL(sanitizedFile));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData object
    const submitData = new FormData();
    
    // Always append name and price
    submitData.append('name', formData.name);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
    
    // Handle image upload
    if (image) {
      submitData.append('productImage', image);
    }
    
    // Handle imageURL - sanitize before submitting
    if (formData.imageURL) {
      const sanitizedImageURL = sanitizeImageURL(formData.imageURL);
      submitData.append('imageURL', sanitizedImageURL);
    }
    
    // For updates, include the ID
    if (product?._id) {
      submitData.append('_id', product._id);
    }
    
    // Submit the form
    onSubmit(submitData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-lg w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewURL ? (
                  <img src={previewURL} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="productImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>{previewURL ? 'Change image' : 'Upload a file'}</span>
                    <input
                      id="productImage"
                      name="productImage"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}



