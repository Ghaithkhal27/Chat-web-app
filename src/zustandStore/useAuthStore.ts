import { create } from 'zustand';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

interface ILoginStore {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
}
interface IsignupStore {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setProfilePicture: (profilePicture: string) => void;
    signup: () => Promise<void>;
}

export const useLoginStore = create<ILoginStore>((set, get) => ({
  email: '',
  password: '',
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  login: async () => {
    try {
      const { email, password } = get(); 
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token',response.data.token)
    } catch (error) {
      console.error(error);
    }
  },
}));

export const useSignupStore = create<IsignupStore>((set,get) =>({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
    setUsername: (username: string) => set({ username }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setProfilePicture: (profilePicture: string) => set({ profilePicture }),
    signup: async () => {
      try {
        const { username, email, password, profilePicture } = get();
        const response = await axios.post(`${API_URL}/api/signup`, {
          username,
          email,
          password,
          profilePicture,
        });
        console.log(response.data);
        
        localStorage.setItem('token',response.data.token)
      } catch (error) {
        console.error(error);
      }
    },
  }))

