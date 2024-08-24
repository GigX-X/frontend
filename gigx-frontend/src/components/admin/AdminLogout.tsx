'use client';

import { useRouter } from "next/navigation";
import axios from "@/utils/axiosConfig";

export default function AdminLogout() {
    console.log("inside logout click")
    const router = useRouter();
    const handleLogout = async () => {
        try {
            // * request to api gateway to clear cookie in server-side.
            await axios.post('/user-service/admin/logout', null, {
                withCredentials: true
            })
    
            // * clear the token from client-side 
            localStorage.removeItem('token');
    
            router.push('/admin/login');
        } catch (error) {
            console.error("Error during logout", error);
        }
    }

    return (
        <button onClick={() => handleLogout()} className="bg-blue">
            Logout
        </button>
    )
}