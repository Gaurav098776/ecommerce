import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserRegistration = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEyeModalOpen, setIsEyeModalOpen] = useState(false); // New state for role modal
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false); // new model for role assign

  const [newUser, setNewUser] = useState({
    userid: "",
    username: "",
    password: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Store the currently selected user for eye modal
  const [userrole, setUserroles] = useState([]);
  const [allroles, setAllroles] = useState([]);
  
  const [assingRole, setAssignRole] = useState({
    role_id: "",
    userid: "",
  });

  const userRoles = async (userid) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/rolesAssign/usersrole/${userid}`
      );
      setUserroles(res.data.data || []);

      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //get all role

  const getAllrole = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/roles/get");
      setAllroles(res.data.data || []);

      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // assign role

  const roleAssign = async (assingRole) => {
    console.log(assingRole); // Ensure this contains both `role_id` and `userid`

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/rolesAssign/assign",
        assingRole
      );
      console.log(res.data.data);

      // Optionally, you can refresh the roles for the current user
      userRoles(assingRole.userid);
    } catch (error) {
      console.log("error", error);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA");
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/getalluser"
      );
      setUsers(res.data.data || []);
      console.log("Fetched data:", res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUsers();
    // userRoles();
  }, []);

  // add user modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setIsEditing(false);
      setNewUser({ userid: "", username: "", password: "", email: "" });
    }
  };

  const toggleEyeModal = () => {
    setIsEyeModalOpen(!isEyeModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const userData = { ...newUser };

      if (isEditing) {
        const response = await axios.patch(
          `http://localhost:8000/api/v1/users/updateuser/${currentUserId}`,
          userData
        );
        if (response.status === 200) {
          setUsers(
            users.map((user) =>
              user.userid === currentUserId ? response.data.data : user
            )
          );
          toggleModal();
        } else {
          console.error("Error updating user:", response.data.message);
        }
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          userData
        );
        if (response.status === 201) {
          setUsers([...users, response.data.data]);
          toggleModal();
        } else {
          console.error("Error adding user:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setNewUser({
      userid: user.userid,
      username: user.username,
      password: "", // Optionally keep password empty
      email: user.email,
    });
    setCurrentUserId(user.userid);
    setIsEditing(true);
    toggleModal();
  };

  const handleAssignRole = (user) => {
    setCurrentUser(user); // Store the selected user
    getAllrole(); // Fetch all available roles
    setIsRoleModalOpen(true); // Open the role assignment modal
  };

  // Function to handle eye button click
  const handleViewUser = (user) => {
    setCurrentUser(user); //
    userRoles(user.userid);
    toggleEyeModal(); // Open eye modal
    setUserroles([]);
  };

  // delete role

  const deleteRole = async (role_id, userid) => {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/rolesAssign/delete/${role_id}/${userid}`
    );
    console.log(res);

    userRoles();
  };

  // toggle button

  const toggleUserStatus = async (userid, action) => {
    console.log(action);
    
    try {
      const res = await axios.patch(`http://localhost:8000/api/v1/users/update/${action}/${userid}`);
      console.log(`${action === 'deactive' ? 'Deactivated' : 'Activated'} user:`, res.data.data);
     
    } catch (error) {
      console.error(`Error ${action} user:`, error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          User Registration
        </h2>
        <button
          onClick={toggleModal}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="py-3 px-4">User ID</th>
            <th className="py-3 px-4">Username</th>
            <th className="py-3 px-4">Register On</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Roles</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 dark:border-gray-700"
            >
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                {user.userid}
              </td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                {user.username}
              </td>

              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                {formatDate(new Date(user.registeron))}{" "}
              </td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                {user.email}
                </td>
                <td className="py-3 px-4">
                <Switch  onClick={() => toggleUserStatus(user.userid, user.status === "deactive" ? "active" : "deactive")} />
              </td>
              <td className="py-3 px-4">
                <Button onClick={() => handleViewUser(user)}>
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button onClick={() => handleAssignRole(user)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </td>
              <td className="py-3 px-4 text-gray-900 dark:text-gray-200">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 px-4 rounded-lg focus:outline-none transition"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-lg">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {isEditing ? "Edit User" : "Add New User"}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="userid"
                placeholder="User ID"
                value={newUser.userid}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                readOnly={isEditing}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={newUser.username}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                {isEditing ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Eye Modal for Viewing User Details */}
      {isEyeModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-lg">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                User Roles
              </h4>
              {/* Display the roles associated with the user */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userrole.map((role, index) => (
                    <TableRow key={index}>
                      <TableCell>{role.userid}</TableCell>
                      <TableCell>{role.role_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            deleteRole(role.role_id, role.userid);
                            toggleEyeModal();
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleEyeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for role assign */}
      {isRoleModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-lg">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Assign Role to {currentUser.username}
            </h4>
            <div>
              {/* Add a dropdown or radio buttons to select the role */}

              <select
                onChange={(e) =>
                  setAssignRole({
                    ...assingRole,
                    role_id: e.target.value,
                    userid: currentUser.userid,
                  })
                }
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Role</option>
                {allroles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await roleAssign(assingRole); // Assign the role first
                    setIsRoleModalOpen(false); // Then close the modal
                  } catch (error) {
                    console.error("Error assigning role:", error);
                  }
                }} // Function to assign the role
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                Assign Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
