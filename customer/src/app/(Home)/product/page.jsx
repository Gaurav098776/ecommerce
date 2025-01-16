'use client'
// import { CategorySidebar } from '.CategorySidebar';
// import { ProductGrid } from './ProductGrid';
import { Search } from 'lucide-react';
import { CategorySidebar } from './Category';
import { ProductGrid } from './ProductGrid';

const Singlepage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Search Bar */}
    <div className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>

    <div className="flex gap-8">
      {/* Categories Sidebar */}
      <div className="hidden lg:block">
        <CategorySidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <select className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Most Popular</option>
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <ProductGrid />
      </div>
    </div>
  </div>
  )
}

export default Singlepage;