import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

const Product = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [subCategory, setSubCategory] = useState([]);

  // console.log('product',user);

  const getData = async () => {
    const res = await axios.get(
      ` http://localhost:8000/api/v1/retailerProduct/getproduct/${user.retid}`
    );

    setData(res.data.data);
    // console.log("result", res.data.data);
  };

  //get subcategory

  const getSubcatgory = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/retailerProduct/subcategory`
    );

    setSubCategory(res.data.data);
    // console.log("subcategory", res.data.data);
  };

  useEffect(() => {
    getData();
    getSubcatgory();
  }, []);

  const products = data;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //add product
  // Add Product State
  const [addformdata, setAddFormdata] = useState({
    pid: user.retid + "",
    sub_catid: "",
    retid: user.retid,
    productname: "",
    price: "",
    qty: "",
    company: "",
    productphoto: "",
  });

  // Handle Form Changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    setAddFormdata((prevData) => ({
      ...prevData,
      productphoto: e.target.files[0],
    }));
  };

  // Add Product Submit
  const addproductHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(addformdata).forEach((key) => {
      formData.append(key, addformdata[key]);
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/retailerProduct/product",
        formData
      );
      if (res.data.success) {
        alert("Product added successfully!");
        getData(); // Refresh product list
        setAddFormdata({
          pid: user.retid + "",
          sub_catid: "",
          retid: user.retid,
          productname: "",
          price: "",
          qty: "",
          company: "",
          productphoto: "",
        }); // Reset form
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please check the input and try again.");
    }
  };

  //delete product

  const deleteProduct = async (pid) => {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/retailerProduct/deleteproduct/${pid}`
    );
    if (res.data.success == "true") {
      getData();
    } else {
      console.log("error in deleting product");
    }
  };

  const [editProduct, setEditProduct] = useState({
    sub_catid: "",
    productname: "",
    price: "",
    qty: "",
    company: "",
    productphoto: "",
  });

  // edit product

  const editeProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(editProduct).forEach((key) => {
      formData.append(key, editProduct[key]);
    });

    console.log('formdata',formData);
    console.log('editProduct',editProduct);
    

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/retailerProduct/updateproduct/${editProduct.pid}`,
        formData
      );
      console.log(formData);
      
      if (res.data.success) {
        alert("Product updated successfully!");
        getData(); // Refresh the product list
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred. Please check the input and try again.");
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFileChange = (e) => {
    setEditProduct((prevData) => ({
      ...prevData,
      productphoto: e.target.files[0],
    }));
  };

  const openEditModal = (product) => {
    setEditProduct({
      pid: product.pid,
      sub_catid: product.sub_catid,
      productname: product.productname,
      price: product.price,
      qty: product.qty,
      company: product.company,
      productphoto: "",
    });
  };

  return (
    <>
      <div className="flex w-full pl-2 max-w-sm items-center space-x-2 ">
        <Input type="search" placeholder="Search the products..." />
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={addproductHandleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productname" className="text-right">
                    Product Id
                  </Label>
                  <Input
                    id="productid"
                    name="pid"
                    value={addformdata.pid}
                    onChange={handleFormChange}
                    placeholder="Enter product Id"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productname" className="text-right">
                    Product Name
                  </Label>
                  <Input
                    id="productname"
                    name="productname"
                    value={addformdata.productname}
                    onChange={handleFormChange}
                    placeholder="Enter product name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sub_catname" className="text-right">
                    Category
                  </Label>

                  <select
                    id="sub_catname"
                    name="sub_catid"
                    value={addformdata.sub_catid}
                    onChange={handleFormChange}
                    className="col-span-3 border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    {subCategory.map((item) => (
                      <option key={item.sub_catid} value={item.sub_catid}>
                        {item.sub_catname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="qty" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={addformdata.company}
                    onChange={handleFormChange}
                    placeholder="Enter company name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="qty" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="qty"
                    name="qty"
                    type="number"
                    value={addformdata.qty}
                    onChange={handleFormChange}
                    placeholder="Enter quantity"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={addformdata.price}
                    onChange={handleFormChange}
                    placeholder="Enter price"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productphoto" className="text-right">
                    Product Photo
                  </Label>
                  <Input
                    id="productphoto"
                    name="productphoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save Product</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative m-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product id{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Product Photo{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* <td className="w-4 p-4">
              <input type="checkbox" className="w-4 h-4" />
            </td> */}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.pid}
                </td>
                {/* <td className="px-6 py-4">{product.price}</td>  */}
                <td className="mr-16 flex justify-center items-center">
                  <img
                    src={product.productphoto}
                    alt={product.productname}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{product.sub_catname}</td>
                <td className="px-6 py-4">{product.productname}</td>
                <td className="px-6 py-4">{product.company}</td>
                <td className="px-6 py-4">{product.qty}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  {/* edit product modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <a
                        href="#"
                        className="text-blue-600 mr-2 hover:underline"
                        onClick={() => openEditModal(product)}
                      >
                        Edit
                      </a>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={editeProduct}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productname" className="text-right">
                              Product Id
                            </Label>
                            <Input
                              id="productid"
                              name="pid"
                              value={editProduct.pid}
                              placeholder="Enter product Id"
                              className="col-span-3"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productname" className="text-right">
                              Product Name
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              value={editProduct.productname}
                              onChange={handleEditFormChange}
                              placeholder="Enter product name"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sub_catname" className="text-right">
                              Category
                            </Label>
                            <select
                              id="sub_catname"
                              name="sub_catid"
                              value={editProduct.sub_catid}
                              onChange={handleEditFormChange}
                              className="col-span-3 border rounded px-3 py-2"
                              required
                            >
                              <option value="">Select Category</option>
                              {subCategory.map((item) => (
                                <option
                                  key={item.sub_catid}
                                  value={item.sub_catid}
                                >
                                  {item.sub_catname}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">
                              Company
                            </Label>
                            <Input
                              id="company"
                              name="company"
                              value={editProduct.company}
                              onChange={handleEditFormChange}
                              placeholder="Enter company name"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="qty" className="text-right">
                              Quantity
                            </Label>
                            <Input
                              id="qty"
                              name="qty"
                              type="number"
                              value={editProduct.qty}
                              onChange={handleEditFormChange}
                              placeholder="Enter quantity"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Price
                            </Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              value={editProduct.price}
                              onChange={handleEditFormChange}
                              placeholder="Enter price"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="productphoto"
                              className="text-right"
                            >
                              Product Photo
                            </Label>
                            <Input
                              id="productphoto"
                              name="productphoto"
                              type="file"
                              accept="image/*"
                              onChange={handleEditFileChange}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="submit">Save Changes</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <a
                    href="#"
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      deleteProduct(product.pid);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Product;
