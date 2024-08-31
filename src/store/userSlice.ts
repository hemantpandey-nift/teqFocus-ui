import http from "../utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface productSliceProps {
  allUserData: { userList: any[]; totalRecords: number };
  availibilityData: { availibilityList: any[] };
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: productSliceProps = {
  allUserData: { userList: [], totalRecords: 0 },
  availibilityData: { availibilityList: [] },
  loading: false,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
