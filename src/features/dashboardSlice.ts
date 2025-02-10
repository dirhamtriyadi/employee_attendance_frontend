import { getData, postData } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  message: string;
  data: any;
  work_schedule: any;
  attendance: any;
  isLoading: boolean;
  errors: any;
}

const initialState: DashboardState = {
  message: "",
  data: null,
  work_schedule: null,
  attendance: null,
  isLoading: false,
  errors: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboard.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(dashboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = action.payload.data || null;
      state.work_schedule = action.payload.work_schedule || null;
      state.attendance = action.payload.attendance || null;
      state.errors = null;
    });
    builder.addCase(dashboard.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(attendanceCheckIn.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(attendanceCheckIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.errors = null;
    });
    builder.addCase(attendanceCheckIn.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const dashboard = createAsyncThunk<any>(
  "dashboard/dashboard",
  async (data, thunkAPI) => {
    try {
      const response = await getData("dashboard", null);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const attendanceCheckIn = createAsyncThunk<any>(
  "dashboard/attendanceCheckIn",
  async (data, thunkAPI) => {
    try {
      const response = await postData("attendances/check-in", null);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const attendanceCheckOut = createAsyncThunk<any>(
  "dashboard/attendanceCheckOut",
  async (data, thunkAPI) => {
    try {
      const response = await postData("attendances/check-out", null);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
