import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';



export const ProductCard = ({ productname, price, rating, productphoto, sub_catname }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative group">
        <img 
          src={productphoto} 
          alt={productname}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {sub_catname}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{productname}</h3>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({rating})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};