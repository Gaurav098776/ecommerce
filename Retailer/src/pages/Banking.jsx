import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Banking = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    retid: user.retid,
    accountno: "",
    bankname: "",
    branchname: "",
    ifsc: "",
    branchcode: "",
    accountholdername: "",
  });

  const [tableData, setTableData] = useState([]);

  // Fetch banking details
  const getData = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/retailerbank/details/${user.retid}`
    );
    setTableData(res.data.data);
    console.log("bank", res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form submit for adding bank details
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/retailerbank/addbankdetails",
        data
      );
      setData({
        retid: user.retid,
        accountno: "",
        bankname: "",
        branchname: "",
        ifsc: "",
        branchcode: "",
        accountholdername: "",
      });
      console.log(res.data.data);
      // After adding, refresh the table data
      getData();
    } catch (error) {
      console.error("Error adding bank details:", error);
    }
  };

  // Handle change in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-xl font-medium mb-2">Banking Details</h2>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 bg-white p-2 shadow-2xl rounded">
            <h3 className="text-lg font-medium mb-4">Add New Banking Details</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account No
                </label>
                <input
                  type="text"
                  name="accountno"
                  value={data.accountno}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankname"
                  value={data.bankname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branchname"
                  value={data.branchname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IFSC
                </label>
                <input
                  type="text"
                  name="ifsc"
                  value={data.ifsc}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch Code
                </label>
                <input
                  type="text"
                  name="branchcode"
                  value={data.branchcode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountholdername"
                  value={data.accountholdername}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Banking Details
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="w-full md:w-2/3 bg-white p-4 shadow-2xl rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Account No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Bank Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Branch Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    IFSC
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Branch Code
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Account Holder Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.accountno}>
                    <td className="border border-gray-300 px-4 py-2">{item.accountno}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.bankname}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.branchname}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.ifsc}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.branchcode}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.accountholdername}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button className="text-blue-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banking;
