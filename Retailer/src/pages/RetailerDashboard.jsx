import React from 'react'


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Sidebar } from "@/components/ui/sidebar"; // Assuming you have a sidebar component
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/feature/authSlice';
import axios from 'axios';

const RetailerDashboard = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler =  async()=>{
    const response = await axios.post("http://localhost:8000/api/v1/retailer/logout", {}, { withCredentials: true });
    console.log(response);
  }
 


  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Retailer Dashboard  (<span>{user.retname}</span>) </h1>
        <Button className="bg-blue-500 text-white" onClick={()=>{dispatch(logout()),logoutHandler()}}>Logout</Button>
      </header>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Card 1: Total Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">145</h2>
            <p>Orders placed this month</p>
          </CardContent>
        </Card>

        {/* Card 2: Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">58</h2>
            <p>Total products available</p>
            <Button className="mt-4 bg-green-500 text-white">Manage Products</Button>
          </CardContent>
        </Card>

        {/* Card 3: Profile Status */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Active</Badge>
            <p className="mt-2">Retailer profile is active</p>
            <Button className="mt-4 bg-blue-500 text-white">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Search Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order-id">Order ID</Label>
                <Input id="order-id" type="text" placeholder="Enter Order ID" />
              </div>
              <div>
                <Label htmlFor="date">Order Date</Label>
                <Input id="date" type="date" />
              </div>
              <Button className="mt-4 bg-blue-500 text-white col-span-2">Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        {user.retname}
      </div>
    </div>
  </div>
  )
}

export default RetailerDashboard