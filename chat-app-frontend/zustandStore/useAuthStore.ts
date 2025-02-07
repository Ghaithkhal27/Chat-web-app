// import { create } from "zustand";
// import axios from 'axios';



// interface User {
//   id: string;
//   username: string;
//   email: string;
// }

// type AuthStateLogin = {
//   user: User | null;
//   email: string;
//   password: string;
//   setEmail: (email: string) => void;
//   setPassword: (password: string) => void;
//   login: (navigate: (path: string) => void) => Promise<void>;
//   logout: () => void;
// };
// type AuthStateSignUp = {
//   username: string;
//   email: string;
//   password: string;
//   setUsername: (username: string) => void;
//   setEmail: (email: string) => void;
//   setPassword: (password: string) => void;
//   signUp: (navigate: (path: string) => void) => Promise<void>;
// };

// export const useAuthStore = create<AuthStateLogin>((set) => ({
//   user: null,
//   email: "",
//   password: "",

//   setEmail: (email) => set({ email }),
//   setPassword: (password) => set({ password }),

//   login: async (navigate) => {
//     try {
//       const { email, password } = useAuthStore.getState();
//       const response = await axios.post('http://localhost:3001/api/login', {
//         email,
//         password,
//       });

//       const token = response.token 
//       localStorage.setItem("token", token);

//       // window.location.href = "/HomePage"
//       navigate("/HomePage");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid email or password!");
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, email: "", password: "" });
//   },
// }));

// export const useSignUpStore = create<AuthStateSignUp>((set) => ({
//   username: "",
//   email: "",
//   password: "",
//   setUsername: (username) => set({ username }),
//   setEmail: (email) => set({ email }),
//   setPassword: (password) => set({ password }),
//   signUp: async (navigate) => {
//     const { username, email, password } = useSignUpStore.getState();
//     try {
//       const response = await handelSignup(username, email, password);
//       const token = response.token 
//       localStorage.setItem("token", token);
//       navigate("/HomePage");
//     } catch (error) {
//       console.error("signUp failed:", error);
//       alert("Invalid email or password!");
//     }
//   },
// }));
