import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getUserList = async () => {
  let userList: any = localStorage.getItem("UserList") ? JSON.parse(localStorage?.getItem("UserList") ?? "") : [];
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(userList);
    }, 500);
  });
};

const getUserData = async (userId: string) => {
  let selectedUser: any = null;
  if (userId) {
    const userList: any = localStorage.getItem("UserList") ? JSON.parse(localStorage?.getItem("UserList") ?? "") : [];
    selectedUser = userList.find((el: any) => el.userId === userId);
    selectedUser.dateOfBirth = new Date(selectedUser.dateOfBirth);
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(selectedUser);
    }, 500);
  });
};

export const fetchUserList: any = createAsyncThunk("/user/list", async (params: any, { rejectWithValue }) => {
  try {
    const responseData: any = await getUserList();
    return responseData;
  } catch (error: any) {
    console.error("error:", error);
    return rejectWithValue(error.response.message ? error.response.message : error);
  }
});

export const fetchUserData: any = createAsyncThunk("/user", async (params: any, { rejectWithValue }) => {
  try {
    const responseData: any = await getUserData(params.userId);
    return responseData;
  } catch (error: any) {
    console.error("error:", error);
    return rejectWithValue(error.response.message ? error.response.message : error);
  }
});

type userState = {
  loading: boolean;
  success: boolean;
  error: any;
  userList: any[];
  selectedUser: any;
};
const initialState: userState = {
  loading: false,
  success: false,
  error: null,
  userList: [],
  selectedUser: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    resetUserData: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state, { payload }) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.userList = [];
    });
    builder.addCase(fetchUserList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userList = payload;
    });
    builder.addCase(fetchUserList.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.userList = [];
    });
    builder.addCase(fetchUserData.pending, (state, { payload }) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.selectedUser = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.selectedUser = payload;
    });
    builder.addCase(fetchUserData.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.selectedUser = null;
    });
  },
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
