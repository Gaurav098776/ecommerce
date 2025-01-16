'use client'
import React, { useState } from 'react';
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
import { CategorySidebar } from '../../app/(Home)/about/CategoryCard';


// Product data structure
const products = {
  Mobiles: [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      description: '256GB, Space Black',
      price: 999.99,
      image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      description: '128GB, Phantom Black',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 3,
      name: 'Google Pixel 7',
      description: '256GB, Obsidian',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=500'
    }
  ],
  Televisions: [
    {
      id: 4,
      name: 'LG OLED 65"',
      description: '4K Smart TV',
      price: 1999.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 5,
      name: 'Samsung QLED 55"',
      description: '4K Ultra HD',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&q=80&w=500'
    }
  ],
  Laptops: [
    {
      id: 6,
      name: 'MacBook Pro 14"',
      description: 'M2 Pro, 16GB RAM',
      price: 1999.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 7,
      name: 'Dell XPS 15',
      description: 'Intel i9, 32GB RAM',
      price: 1799.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=500'
    }
  ]
};

const categories = [
  {
    name: 'Electronics',
    icon: <MonitorSmartphone className="h-5 w-5" />,
    subcategories: [
      { name: 'Mobiles', icon: <Smartphone className="h-4 w-4" /> },
      { name: 'Televisions', icon: <Tv className="h-4 w-4" /> },
      { name: 'Laptops', icon: <Laptop className="h-4 w-4" /> }
    ]
  },
  {
    name: 'Grocery',
    icon: <ShoppingCart className="h-5 w-5" />,
    subcategories: [
      { name: 'Fresh Vegetables' },
      { name: 'Fresh Fruits' },
      { name: 'Daily Essentials' }
    ]
  },
  {
    name: 'Home & Furniture',
    icon: <Armchair className="h-5 w-5" />,
    subcategories: [
      { name: 'Living Room', icon: <Sofa className="h-4 w-4" /> },
      { name: 'Bedroom' },
      { name: 'Kitchen & Dining' }
    ]
  },
  {
    name: 'Fashion',
    icon: <Shirt className="h-5 w-5" />,
    subcategories: [
      { name: "Men's Fashion" },
      { name: "Women's Fashion" },
      { name: 'Kids Fashion', icon: <Baby className="h-4 w-4" /> }
    ]
  },
  {
    name: 'Travel',
    icon: <Plane className="h-5 w-5" />,
    subcategories: [
      { name: 'Flight Tickets' },
      { name: 'Bus Tickets' },
      { name: 'Train Tickets' }
    ]
  },
  {
    name: 'Automotive',
    icon: <Car className="h-5 w-5" />,
    subcategories: [
      { name: 'Car Accessories' },
      { name: 'Bike Accessories' },
      { name: 'Car Care' }
    ]
  }
];

function Product2() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (subcategory) => {
    setSelectedCategory(subcategory);
    setActiveCategory(null);
  };

  const handleAddToCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  const currentProducts = selectedCategory ? products[selectedCategory] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

          {/* Main Content Area */}
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
                        onClick={() => handleAddToCart(product.id)}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Default featured products
                [1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow">
                    <div className="mb-4 h-48 bg-gray-200 rounded"></div>
                    <h3 className="mb-2 font-semibold">Product {item}</h3>
                    <p className="text-sm text-gray-600">Product description goes here</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-bold text-blue-600">$99.99</p>
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
