

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, AlertCircle, Loader, PlusCircle, MinusCircle } from 'lucide-react';
import ProductForm from './ProductForm';
import { useProducts } from "../services/ProductServices";
import { UserContext } from "../contexts/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  const { authenticatedFetch, user } = useContext(UserContext);
  const productService = useProducts();

  useEffect(() => {
    loadProducts();
    loadCarouselProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCarouselProducts = async () => {
    try {
      const response = await authenticatedFetch(BASE_URL+'/api/carousel-products');
      const data = await response.json();
      if (data.success) {
        setCarouselProducts(data.data.map(cp => cp.product?._id).filter(id => id));
      }
    } catch (error) {
    }
  };

  const handleAddToCarousel = async (productId) => {
    if (user?.isAdmin !== true) {
      alert('Only admins can add products to the carousel.');
      return;
    }
    try {
      const response = await authenticatedFetch(BASE_URL+'/api/carousel-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID: productId }),
      });
      const data = await response.json();
      if (data.success) {
        setCarouselProducts([...carouselProducts, productId]);
        toast.success('Product added to carousel successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to add product to carousel.');
    }
  };

  const handleRemoveFromCarousel = async (productId) => {
    if (user?.isAdmin !== true) {
      alert('Only admins can remove products from the carousel.');
      return;
    }
    try {
      const response = await authenticatedFetch(BASE_URL+'/api/carousel-products');
      const data = await response.json();
      if (data.success) {
        const carouselEntry = data.data.find(cp => cp.product?._id === productId);
        if (carouselEntry) {
          await authenticatedFetch(BASE_URL+`/api/carousel-products/${carouselEntry._id}`, {
            method: 'DELETE',
          });
          setCarouselProducts(carouselProducts.filter(id => id !== productId));
          toast.success('Product removed from carousel successfully!');
        }
      }
    } catch (error) {
      toast.error('Failed to remove product from carousel.');
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      const newProduct = await productService.addProduct(formData);
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setIsModalOpen(false);
      loadProducts(); // Re-fetch products to ensure the list is updated
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const productId = formData.get("_id");
      const updatedProduct = await productService.updateProduct(productId, formData);
      setProducts(prevProducts => 
        prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      setIsModalOpen(false);
      setEditingProduct(null);
      loadProducts(); // Re-fetch products to ensure the list is updated
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prevProducts => prevProducts.filter((p) => p._id !== id));
      if (carouselProducts.includes(id)) {
        await handleRemoveFromCarousel(id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Products Management
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mr-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="border rounded-lg p-4 flex flex-col justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                {user?.isAdmin === true && (
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => {
                        if (carouselProducts.includes(product._id)) {
                          handleRemoveFromCarousel(product._id);
                        } else {
                          handleAddToCarousel(product._id);
                        }
                      }}
                      className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      title={carouselProducts.includes(product._id) ? "Remove from carousel" : "Add to carousel"}
                    >
                      {carouselProducts.includes(product._id) ? (
                        <MinusCircle className="w-6 h-6 text-red-600" />
                      ) : (
                        <PlusCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </button>
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  {product.description}
                </p>
                <p className="text-gray-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {isModalOpen && (
        <ProductForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          product={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;