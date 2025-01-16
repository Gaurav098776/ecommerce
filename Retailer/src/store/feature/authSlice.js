import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true, // Initially set loading to true
  error: null,
};
 
// Create async action for login
export const loginRetailer = createAsyncThunk("loginRetailer", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/retailer/login", data, { withCredentials: true }); 
    
    if (response.status === 200) {
      const token = response.data.data.accessToken;
      const user = response.data.data.user;
      console.log("Token:", token); 
      console.log("User:", user);  
      // console.log('loginData', response.data.data);
      
      //dispatch reducs for set the user data in slice 
      return { token,user };
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
        "http://localhost:8000/api/v1/retailer/details",
        { withCredentials: true }
      );
      const user = response.data.data;
      
      
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
    },
  },
  extraReducers: (builder) => {
    builder
      // loginRetailer thunk
      .addCase(loginRetailer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginRetailer.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;  // You can still store in Redux if needed
        state.loading = false;
      })
      .addCase(loginRetailer.rejected, (state, action) => {
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
