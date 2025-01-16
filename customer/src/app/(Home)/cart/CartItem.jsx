import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';


export const CartItem = ({
  id,
  name,
  price, 
  image,
  quantity,
  color,
  availableColors,
  onQuantityChange,
  onColorChange,
  onRemove,
}) => {
  return (
    <div className="flex gap-6 p-4 border-b border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Color:</span>
            <select
              value={color}
              onChange={(e) => onColorChange(id, e.target.value)}
              className="p-1 rounded border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {availableColors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => quantity > 1 && onQuantityChange(id, quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            ${price.toFixed(2)} each
          </span>
          <span className="text-lg font-semibold text-blue-600">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};