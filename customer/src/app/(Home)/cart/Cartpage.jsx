'use client'
import React, { useState } from 'react';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

const CartProduct = [
  {
    id: '1',
    name: 'MacBook Pro M2',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop',
    quantity: 1,
    color: 'Space Gray',
    availableColors: ['Space Gray', 'Silver'],
    description: 'Apple M2 chip, 13-inch Retina display, 8GB RAM, 256GB SSD'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=400&fit=crop',
    quantity: 1,
    color: 'Natural Titanium',
    availableColors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    description: 'A17 Pro chip, 6.1" Super Retina XDR display, Pro camera system'
  },{
    id: '3',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=400&fit=crop',
    quantity: 1,
    color: 'Natural Titanium',
    availableColors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    description: 'A17 Pro chip, 6.1" Super Retina XDR display, Pro camera system'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=400&fit=crop',
    quantity: 1,
    color: 'Natural Titanium',
    availableColors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    description: 'A17 Pro chip, 6.1" Super Retina XDR display, Pro camera system'
  }
];

export const CartPage = () => {
  const [products, setProducts] = useState(CartProduct);
  
  const handleQuantityChange = (id, newQuantity) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };
  
  const handleColorChange = (id, newColor) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, color: newColor } : product
    ));
  };
  
  const handleRemove = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.1; // 10% tax

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id}>
                  <CartItem
                    {...product}
                    onQuantityChange={handleQuantityChange}
                    onColorChange={handleColorChange}
                    onRemove={handleRemove}
                  />
                  <div className="px-4 py-3 bg-gray-50">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Product Description:</h4>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
          />
        </div>
      </div>
    </div>
  );
};
