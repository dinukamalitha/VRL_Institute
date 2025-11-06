import api from "../utils/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  message: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse | null> => {
  try {
    const response = await api.post("/api/users/login", payload);

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};
