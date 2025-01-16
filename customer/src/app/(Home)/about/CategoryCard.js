import React from 'react';
import { ChevronRight } from 'lucide-react';


export function CategorySidebar({ 
  categories, 
  activeCategory, 
  onCategoryHover, 
  onSubcategoryClick 
}){
  return (
   
    
    <div className="w-1/5">
      <div className="rounded-lg bg-white shadow sticky top-24">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800">Categories</h2>
        </div>
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => onCategoryHover(category.name)}
            onMouseLeave={() => onCategoryHover(null)}
          >
            <div className={`flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 ${
              activeCategory === category.name ? 'bg-gray-50' : ''
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-primary-600">{category.icon}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            
            {activeCategory === category.name && (
              <div className="absolute left-full top-0 z-10 min-w-[200px] rounded-lg bg-white p-4 shadow-lg">
                <div className="grid gap-2">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.name}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-50"
                      onClick={() => onSubcategoryClick(sub.name)}
                    >
                      {sub.icon && <span className="text-primary-600">{sub.icon}</span>}
                      <span className="text-sm text-gray-700">{sub.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}