import React, { useEffect, useState } from "react";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

const SubCategory = () => {
  const [option, setOption] = useState([]);

  const [tableData, setTableData] = useState([]);

  //Add subcategory
  const [formData, setFormData] = useState({
    sub_catid: "",
    catid: "",
    sub_catname: "",
  });

  // get category data

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/category/getall"
      );
      setOption(res.data.data || []);
      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Reset data on error
    }
  };

  // get subCategory data

  const getTableData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/subcategory/getall"
      );
      setTableData(res.data.data || []);
      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Reset data on error
    }
  };

  useEffect(() => {
    getData();
    getTableData();
  }, []);

  const handleSubmit = async () => {
    console.log("Submitting formData:", formData);

    try {
      const url = "http://localhost:8000/api/v1/subcategory/create"; // Replace with your API endpoint

      // post api
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        // Handle success (e.g., show a success message)
        console.log("Data submitted successfully!");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    getData();
  };

  return (
    <Card>
      <div className="px-7 py-2 flex justify-between">
        <CardTitle>Sub Category</CardTitle>

        {/* Modal to Add SubCategory */}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 gap-1 bg-green-400"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Sub Category
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Sub Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  SubCategory ID
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => {
                    setFormData({ ...formData, sub_catid: e.target.value });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Category Name
                </Label>

                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, catid: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {option.map((item) => (
                        <SelectItem key={item.catid} value={item.catid}>
                          {item.catname}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Sub Category name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => {
                    setFormData({ ...formData, sub_catname: e.target.value });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="zinc-600"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Category Id</TableHead>
            <TableHead className="">Category Name</TableHead>
            <TableHead className="hidden sm:table-cell">
              Sub Category Id
            </TableHead>
            <TableHead className="">Sub Category Name</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.sub_catid} className="bg-accent">
              <TableCell className="hidden sm:table-cell pl-10">
                {item.catid}
              </TableCell>
              {/* Category Id */}
              <TableCell className="pl-14">{item.catname}</TableCell>
              {/* Category Name */}
              <TableCell className="hidden sm:table-cell pl-14">
                {item.sub_catid}
              </TableCell>
              {/* Sub Category Id */}
              <TableCell className="pl-14">{item.sub_catname}</TableCell>
              {/* Sub Category Name */}
              <TableCell className="">
                {/* Edit and Delete buttons */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-300">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Make changes to your Category here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="catid" className="text-right">
                          Category ID
                        </Label>
                        <Input id="catid" className="col-span-3" readOnly />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Category Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SubCategory;
