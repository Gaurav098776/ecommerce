'use client'
import React, { useEffect, useState } from 'react';
import { 
  MonitorSmartphone, 
  ShoppingCart, 
  Armchair, 
  Shirt,
  Plane,
  Smartphone,
  Tv,
  Laptop,
  Sofa,
  Baby,
  Car,
  Plus
} from 'lucide-react';
import { CategorySidebar } from './CategoryCard';
import axios from 'axios';

function Product2() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [randomProducts, setRandomProducts] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get('/api/product/category');
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/product/selectedProduct');
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts({});
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/product');
        setRandomProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching random products:', err);
      }
    };
    getCategories();
    fetchProducts();
    getProducts();
  }, []);

  const handleCategoryClick = (subcategory) => {
    setSelectedCategory(subcategory);
    setActiveCategory(null);
  };

  const handleAddToCart = async (product) => {
    try {
      const { pid } = product; // Assuming `pid` is the product ID in your API response
      const customer_id = 123; // Replace with actual customer ID (e.g., from context or state)
      const quantity = 1;

      const res = await axios.post('/api/cart', { customer_id, pid, quantity });
      if (res.status === 200) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.pid === pid);
          if (existingItem) {
            return prevCart.map((item) =>
              item.pid === pid
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
        alert('Item added to cart successfully!');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart.');
    }
  };

  const currentProducts = selectedCategory ? products[selectedCategory] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryHover={setActiveCategory}
            onSubcategoryClick={handleCategoryClick}
          />

          <div className="w-4/5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory ? `${selectedCategory}` : 'Featured Products'}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {selectedCategory ? (
                currentProducts.map((product) => (
                  <div key={product.id} className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mb-4 h-48 w-full rounded object-cover"
                    />
                    <h3 className="mb-2 font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-bold text-blue-600">${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                randomProducts.map((item) => (
                  <div key={item.pid} className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow">
                    <img
                      src={item.productphoto}
                      alt={item.productname}
                      className="mb-4 h-48 w-full rounded object-cover"
                    />
                    <h3 className="mb-2 font-semibold">{item.productname}</h3>
                    <p className="text-sm text-gray-600">{item.company}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-bold text-blue-600">${item.price}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product2;
