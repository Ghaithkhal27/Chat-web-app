import { create } from "zustand";
import { token } from "../util/token";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

 export interface User {
  id: string;
  username: string;
  profilePicture: string | null;
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  getUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
}));
