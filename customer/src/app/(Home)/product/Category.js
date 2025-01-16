import React from 'react'
import { Laptop, Smartphone, Watch, Headphones, Camera, Gamepad } from 'lucide-react';

const categories = [
  { name: 'Laptops', icon: <Laptop className="w-5 h-5" />, count: 124 },
  { name: 'Smartphones', icon: <Smartphone className="w-5 h-5" />, count: 98 },
  { name: 'Smartwatches', icon: <Watch className="w-5 h-5" />, count: 45 },
  { name: 'Headphones', icon: <Headphones className="w-5 h-5" />, count: 67 },
  { name: 'Cameras', icon: <Camera className="w-5 h-5" />, count: 32 },
  { name: 'Gaming', icon: <Gamepad className="w-5 h-5" />, count: 76 },
];

export const CategorySidebar = () => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-blue-600">{category.icon}</span>
              <span className="text-gray-700">{category.name}</span>
            </div>
            <span className="text-sm text-gray-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

