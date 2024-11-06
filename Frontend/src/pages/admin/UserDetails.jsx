import React from 'react';

const UserDetails = () => {
  const users = [
    {
      id: 1,
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: 'active',
      role: 'Admin',
      phone: '123-456-7890',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      pinCode: '90210',
      country: 'USA',
      image: 'https://via.placeholder.com/50', // Placeholder image
    },
    {
      id: 2,
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      status: 'inactive',
      role: 'User',
      phone: '234-567-8901',
      address: '456 Elm St',
      city: 'Othertown',
      state: 'NY',
      pinCode: '10001',
      country: 'USA',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      username: 'alice',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      status: 'active',
      role: 'Moderator',
      phone: '345-678-9012',
      address: '789 Oak St',
      city: 'Sometown',
      state: 'TX',
      pinCode: '73301',
      country: 'USA',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 4,
      username: 'bob',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      status: 'inactive',
      role: 'User',
      phone: '456-789-0123',
      address: '101 Pine St',
      city: 'Anycity',
      state: 'FL',
      pinCode: '33101',
      country: 'USA',
      image: 'https://via.placeholder.com/50',
    },
    // Add more users as needed
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4 w-1/12">ID</th>
              <th className="py-3 px-4 w-1/12">Image</th>
              <th className="py-3 px-4 w-1/6">User ID</th>
              <th className="py-3 px-4 w-1/6">First Name</th>
              <th className="py-3 px-4 w-1/6">Last Name</th>
              <th className="py-3 px-4 w-1/4">Email</th>
              <th className="py-3 px-4 w-1/12">Status</th>
              <th className="py-3 px-4 w-1/12">Role</th>
              <th className="py-3 px-4 w-1/12">Phone No</th>
              <th className="py-3 px-4 w-1/4">Address</th>
              <th className="py-3 px-4 w-1/6">City</th>
              <th className="py-3 px-4 w-1/6">State</th>
              <th className="py-3 px-4 w-1/6">Pincode</th>
              <th className="py-3 px-4 w-1/6">Country</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.id}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                  <img src={user.image} alt={user.username} className="w-12 h-12 rounded-full" />
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.username}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.firstName}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.lastName}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full 
                    ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200'}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.role}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.phone}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.address}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.city}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.state}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.pinCode}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-200">{user.country}</td>
                {/* <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 px-4 rounded-lg focus:outline-none transition">
                    Edit
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
