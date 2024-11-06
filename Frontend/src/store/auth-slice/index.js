import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  loading: true, // Initially set loading to true
  error: null,
};

// Create async action for login
export const loginUser = createAsyncThunk("loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/login", data, { withCredentials: true }); 
    
    if (response.status === 200) {
      const token = response.data.data.accessToken;
      const user = response.data.data.user;
      console.log("Token:", token); 
      console.log("User:", user);  
      //dispatch reducs for set the user data in slice 
      return { token, user };
    } else {
      return rejectWithValue("Error submitting data.");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create async action for checkAuth
export const checkAuth = createAsyncThunk(
  "api/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/protected/check-auth",
        { withCredentials: true }
      );
      const user = response.data.data;
      console.log(user.role);
      
      console.log("Check Auth User:", user); // Check the user object in the console

      if (!user || !user.role) {
        // Check for 'role' instead of 'role_name'
        throw new Error("Invalid user data");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role_name;
        state.token = action.payload.token; // You can still store in Redux if needed
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // checkAuth thunk
      .addCase(checkAuth.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.role = action.payload.role; // Use 'role' from the response
        }
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
