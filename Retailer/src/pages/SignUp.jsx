import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  
  const [formData, setFormData] =  useState({
    retid : "",
    retname : "",
    contactno : "",
    alternatecontact: "",
    address: "",
    state : "",
    city : "",
    pincode: "",
    email : "",
    url : "",
    password : "",
    status : "",
    registeron: ""
  })

  const navigate =  useNavigate()

  const handleSubmit =  async(e) => {
    console.log("hii",formData);
    e.preventDefault();
    try{
      
      let res =  await axios.post("http://localhost:8000/api/v1/retailer/register", formData)
      if (res.status === 201) {
        // Handle success (e.g., show a success message)
        console.log("Data submitted successfully!");
        navigate("/")
      }else {
        // Handle error (e.g., show an error message)
        console.error("Error submitting data.");
      }
    }catch(error){
      console.log("singup form:",error);
    }
  } 


  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <Card className="mx-auto max-w-6xl p-10 h-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Retailer Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Retailer ID */}
            <div className="col-span-1">
              <Label htmlFor="retid">Retailer ID</Label>
              <Input id="retid" type="text" placeholder="Enter retailer ID" onChange={(e) => {
                    setFormData({ ...formData, retid: e.target.value })
                  }} required />
            </div>

            {/* Retailer Registration Number */}
            <div className="col-span-1">
              <Label htmlFor="retregno">Retailer Registration No.</Label>
              <Input id="retregno" type="text" placeholder="Enter registration number" onChange={(e) => {
                    setFormData({ ...formData, retregno: e.target.value })
                  }} required />
            </div>

            {/* Retailer Name */}
            <div className="col-span-1">
              <Label htmlFor="retname">Retailer Name</Label>
              <Input id="retname" type="text" placeholder="Enter retailer name" onChange={(e) => {
                    setFormData({ ...formData, retname: e.target.value })
                  }} required />
            </div>

            {/* Contact Number */}
            <div className="col-span-1">
              <Label htmlFor="contactno">Contact Number</Label>
              <Input id="contactno" type="text" placeholder="Enter contact number" onChange={(e) => {
                    setFormData({ ...formData, contactno: e.target.value })
                  }} required />
            </div>

            {/* Alternate Contact */}
            <div className="col-span-1">
              <Label htmlFor="alternatecontact">Alternate Contact</Label>
              <Input id="alternatecontact" type="text" placeholder="Enter alternate contact" onChange={(e) => {
                    setFormData({ ...formData, alternatecontact: e.target.value })
                  }} />
            </div>

            {/* Address */}
            <div className="col-span-1">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="Enter address" onChange={(e) => {
                    setFormData({ ...formData, address : e.target.value })
                  }} required />
            </div>

            {/* State */}
            <div className="col-span-1">
              <Label htmlFor="state">State</Label>
              <Input id="state" type="text" placeholder="Enter state" onChange={(e) => {
                    setFormData({ ...formData, state: e.target.value })
                  }} required />
            </div>

            {/* City */}
            <div className="col-span-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" placeholder="Enter city" onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value })
                  }} required />
            </div>

            {/* Pincode */}
            <div className="col-span-1">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" type="text" placeholder="Enter pincode" onChange={(e) => {
                    setFormData({ ...formData, pincode: e.target.value })
                  }} required />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                  }} required />
            </div>

            {/* Website URL */}
            <div className="col-span-1">
              <Label htmlFor="url">Website URL</Label>
              <Input id="url" type="url" placeholder="Enter website URL" onChange={(e) => {
                    setFormData({ ...formData, url: e.target.value })
                  }} />
            </div>

            {/* PAN Number */}
            <div className="col-span-1">
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" type="text" placeholder="Enter PAN number" onChange={(e) => {
                    setFormData({ ...formData, pan : e.target.value })
                  }} required />
            </div>

            {/* Password */}
            <div className="col-span-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                  }} required />
            </div>

            {/* Status */}
            <div className="col-span-1">
              <Label htmlFor="status">Status</Label>
              <Input id="status" type="text" placeholder="Active/Inactive" onChange={(e) => {
                    setFormData({ ...formData, status: e.target.value })
                  }} required />
            </div>

            {/* Register On */}
            <div className="col-span-1">
              <Label htmlFor="registeron">Register On</Label>
              <Input id="registeron" type="date" onChange={(e) => {
                    setFormData({ ...formData, registeron: e.target.value })
                  }} required />
            </div>

            {/* Full Width Submit Button */}
            <div className="col-span-3">
              <Button type="submit" className="w-full bg-green-500 text-white h-12" onClick={handleSubmit}>
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
