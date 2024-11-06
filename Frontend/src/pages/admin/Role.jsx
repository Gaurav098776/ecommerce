import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Role = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    role_id: '',
    role_name: ''
  });

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/roles/get");
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

  const deleteRole = async (role_id) => {
    try {
      let res = await axios.delete(
        `http://localhost:8000/api/v1/roles/delete/${role_id}`
      );
      console.log("Deleted role:", res.data.data);
      getData(); // Refresh table
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting formData:", formData);

    try {
      const url = "http://localhost:8000/api/v1/roles/create";
      const response = await axios.post(url, formData);

      if (response.status === 201) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    getData(); // Refresh the table after submission
  };

  return (
    <div className="md:flex md:gap-6 justify-around">
      {/* Form Section */}
      <div className="md:w-1/3 p-8 shadow-xl rounded-sm border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-300 py-4 px-6 dark:border-gray-700">
          <h3 className="font-medium text-black dark:text-white">Add Roles</h3>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div>
            <label className="mb-2 block text-black dark:text-white">Role ID</label>
            <input
              type="text"
              placeholder="Enter Role ID"
              // value={formData.role_id}
              onChange={(e) => setFormData({...formData, role_id: e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-black outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-black dark:text-white">Role Name</label>
            <input
              type="text"
              placeholder="Enter Role Name"
              
              // value={formData.role_name}
              onChange={(e) => setFormData({...formData, role_name: e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-black outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button className="mt-4 rounded-lg bg-indigo-500 py-2 px-6 text-white hover:bg-indigo-600" onClick={handleSubmit}>
            Add Role
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="md:w-2/3 mt-8 md:mt-0 p-6 shadow-xl rounded-sm border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 flex-grow">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Roles Table</h4>

        {/* Table Headers */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 border-b-2 border-gray-300 dark:border-gray-700 pb-2">
          <div className="p-2.5 text-sm font-medium text-black dark:text-white uppercase">Role ID</div>
          <div className="p-2.5 text-center text-sm font-medium text-black dark:text-white uppercase">Role Name</div>
          <div className="p-2.5 text-center text-sm font-medium text-black dark:text-white uppercase">Action</div>
        </div>

        {/* Data Rows */}
        {data.map((item) => (
          <div key={item.role_id} className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-4 border-b border-gray-300 dark:border-gray-700 py-2">
            <div className="p-2.5 flex items-center text-black dark:text-white">{item.role_id}</div>
            <div className="p-2.5 text-center text-black dark:text-white">{item.role_name}</div>
            <div className="p-2.5 text-center">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 px-4 rounded-lg focus:outline-none transition" onClick={() => deleteRole(item.role_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Role;
