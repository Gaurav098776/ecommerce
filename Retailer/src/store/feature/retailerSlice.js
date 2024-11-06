import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  retailer: null,
  loading: true, // Initially set loading to true
  error: null,
};


// Create async action for checkAuth and get Retailer details
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

      if (!user ) {
        // Check for 'role' instead of 'role_name'
        throw new Error("Invalid user data");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Retailer Slice

const retailerSlice =  createSlice({
  name: 'retailer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.retailer = action.payload.retailer;
    });
  },

})

export default retailerSlice.reducer;