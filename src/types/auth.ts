export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  errors: any;
}

export interface RegisterUser {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: {
    token: string;
  };
  user: User;
}
