import { create } from "zustand";
  import axios from "../lib/axios";
  import { toast } from "react-hot-toast";

  export const useUserStore = create((set, get) => ({
      user: null,
      loading: false,
      checkingAuth: true,
      initialAuthChecked: false,

      signup: async ({ name, email, password, confirmPassword }) => {
          set({ loading: true });
          try {
              if (password !== confirmPassword) {
                  return toast.error("Passwords do not match");
              }
              const res = await axios.post("/auth/signup", { name, email, password });
              set({ user: res.data });
          } catch (error) {
              toast.error(error.response?.data?.message || "An error occurred");
          } finally {
              set({ loading: false });
          }
      },

      login: async (email, password) => {
          set({ loading: true });
          try {
              const res = await axios.post("/auth/login", { email, password });
              set({ user: res.data });
              toast.success("Login successful!");
          } catch (error) {
              toast.error(error.response?.data?.message || "An error occurred");
          } finally {
              set({ loading: false });
          }
      },

      logout: async () => {
          try {
              await axios.post("/auth/logout");
              set({ user: null });
          } catch (error) {
              toast.error(error.response?.data?.message || "An error occurred during logout");
          }
      },

      checkAuth: async () => {
          if (get().initialAuthChecked) {
              set({ checkingAuth: false });
              return;
          }
          set({ checkingAuth: true });
          try {
              const response = await axios.get("/auth/profile");
              set({ user: response.data });
          } catch (error) {
              console.log(error.message);
              set({ user: null });
          } finally {
              set({ checkingAuth: false, initialAuthChecked: true });
          }
      },

      refreshToken: async () => {
          if (get().checkingAuth) return;

          set({ checkingAuth: true });
          try {
              const response = await axios.post("/auth/refresh-token");
              return response.data;
          } catch (error) {
              set({ user: null });
              throw error;
          } finally {
              set({ checkingAuth: false });
			  console.log("REFRESH TOKEN FINISHED, CHECKING AUTH SET TO FALSE");
          }
      },
    fetchAllUsers: async () => {
      set({ loading: true });
      try {
          const response = await axios.get("/users");
          set({ users: response.data, loading: false });
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch users");
          set({ loading: false });
      }
	},

	deleteUser: async (userId) => {
      try {
          await axios.delete(`/users/${userId}`);
          set((state) => ({
              users: state.users.filter((user) => user._id !== userId),
          }));
          toast.success("User deleted successfully");
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to delete user");
      }
	},

	updateUserRole: async (userId, newRole) => {
      try {
          const response = await axios.patch(`/users/${userId}/role`, { role: newRole });
          set((state) => ({
              users: state.users.map((user) =>
                  user._id === userId ? { ...user, role: response.data.role } : user
              ),
          }));
          toast.success("User role updated successfully!");
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to update user role");
      }
    },
  }));

  // Axios interceptor for token refresh
  let refreshPromise = null;

  axios.interceptors.response.use(
      (response) => response,
      async (error) => {
          const originalRequest = error.config;

          if (originalRequest.url === "/auth/login" || originalRequest.url === "/auth/profile") {
              return Promise.reject(error);
          }

          if (error.response?.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              try {
                  if (refreshPromise) {
                      await refreshPromise;
                      return axios(originalRequest);
                  }

                  refreshPromise = useUserStore.getState().refreshToken();
                  await refreshPromise;
                  refreshPromise = null;
                  return axios(originalRequest);
              } catch (refreshError) {
                  useUserStore.getState().logout();
                  refreshPromise = null;
                  return Promise.reject(refreshError);
              }
          }
          return Promise.reject(error);
      }
  );