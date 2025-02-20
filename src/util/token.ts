import { jwtDecode } from "jwt-decode";

interface Iuser {
    userId: string;
    userName: string;
}

const getToken = localStorage.getItem("token");

export const token = getToken ? jwtDecode<Iuser>(getToken) : null;
