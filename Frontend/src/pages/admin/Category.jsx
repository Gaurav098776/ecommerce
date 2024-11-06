import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  PlusCircle,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import axios from "axios";
import * as React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { useEffect } from "react";

export function Category() {
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(null);

  // get data

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    catid: "",
    catname: "",
    startdate: date,
  });
  const [editform, setEditform] = useState({
    catname: "",
    startdate: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/category/getall"
      );
      setData(res.data.data || []);
      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Reset data on error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    console.log("Submitting formData:", formData);

    try {
      const url = "http://localhost:8000/api/v1/category/createCategory"; // Replace with your API endpoint

      // post api
      const response = await axios.post(url, formData);

      if (response.status === 201) {
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

  //delete

  const deleteCategory = async (catid) => {
    console.log(catid);
    let res = await axios.delete(
      `http://localhost:8000/api/v1/category/deleteCategory/${catid}`
    );
    console.log(res.data.data);
    getData();
  };

  const editCategory = async (catid) => {
    console.log(catid);
    console.log(editform);

    let res = await axios.patch(
      `http://localhost:8000/api/v1/category/update/${catid}`,
      editform
    );
    console.log(res.data.data);
    getData();
  };

  const itemsPerPage = 5;

  // Calculate the data to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Determine the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardHeader className="px-7 flex-row justify-between">
        <div>
          <CardTitle>Category</CardTitle>
          <CardDescription>Manage product category.</CardDescription>
        </div>

        {/* Add product category */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 gap-1 bg-green-400"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Category ID
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => {
                    setFormData({ ...formData, catid: e.target.value });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Category Name
                </Label>
                <Input
                  id="name"
                  onChange={(e) => {
                    setFormData({ ...formData, catname: e.target.value });
                  }}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Date
                </Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setFormData((prev) => ({
                          ...prev,
                          startdate: selectedDate
                            ? selectedDate.toISOString()
                            : null, // Ensure correct format
                        }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="secondary"
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category ID</TableHead>
              <TableHead className="hidden sm:table-cell">
                Category Name
              </TableHead>
              <TableHead className="hidden sm:table-cell">Start Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.catid} className="bg-accent">
                <TableCell>
                  <div className="font-medium">{item.catid}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.catname}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(new Date(item.startdate), "yyyy-MM-dd")}
                </TableCell>
                <TableCell className="text-right">
                  {/* edit modal */}
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
                          <Input
                            id="catid"
                            defaultValue={item.catid}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Category Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue={item.catname}
                            onChange={(e) => {
                              setEditform({
                                ...editform,
                                catname: e.target.value,
                              });
                            }}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "yyyy-MM-dd")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={item.startdate}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  setEditform((prev) => ({
                                    ...prev,
                                    startdate: selectedDate
                                      ? selectedDate.toISOString()
                                      : null, // Ensure correct format
                                  }));
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => {
                              editCategory(item.catid);
                            }}
                            variant="secondary"
                          >
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
                          delete your data and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteCategory(item.catid);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
