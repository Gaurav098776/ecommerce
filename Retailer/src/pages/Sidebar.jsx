import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md">
      <div className="p-4">
        {/* Sidebar Header */}
        <h2 className="text-xl font-bold mb-4">Retailer Panel</h2>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <Link to="retailer">
            <Button className="w-full text-left" variant="ghost">
              Orders
            </Button>
          </Link>
          <Link to="/dashboard/products">
            <Button className="w-full text-left" variant="ghost">
              Products
            </Button>
          </Link>
          <Link to="/dashboard/profile">
            <Button className="w-full text-left" variant="ghost">
              Profile
            </Button>
          </Link>
          <Link to="/dashboard/settings">
            <Button className="w-full text-left" variant="ghost">
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
