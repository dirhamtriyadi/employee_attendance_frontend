import {
  AuthState,
  LoginResponse,
  LoginUser,
  RegisterUser,
} from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/services/api";

// Pengambilan data dari localStorage jika page di refresh
const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;
const isAuthenticated = !!token && !!user;

// Inisialisasi AuthState
const initialState: AuthState = {
  user: user,
  token: token,
  isAuthenticated: isAuthenticated,
  isLoading: false,
  errors: null,
};

// Membuat authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.errors = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token.token);
    });
    builder.addCase(login.rejected, (state: any, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

// Membuat fungsi register yang akan dipanggil dengan dispatch
export const register = createAsyncThunk<void, RegisterUser>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (error: any) {
      if (error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Membuat fungsi login yang akan dipanggil dengan dispatch
export const login = createAsyncThunk<LoginResponse, LoginUser>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (error: any) {
      if (error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
