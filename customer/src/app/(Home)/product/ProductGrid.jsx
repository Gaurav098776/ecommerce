'use client';
import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import axios from 'axios';

export const ProductGrid = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/product'); // Use relative URL for better compatibility
        setProducts(res.data);
        console.log('p',res.data);
        
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Display error message
  if (products.length === 0) return <p>No products available</p>; // Handle empty products array

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* {products.map((product) => (
        <ProductCard key={product.pid} {...product} /> // Ensure ProductCard expects `product` structure
      ))} */}
    </div>
  );
};
