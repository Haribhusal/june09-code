import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";


export function useAuth() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/auth/login");
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        // Get user from localStorage on mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }


        // Watch for changes to localStorage from other tabs/components
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            if (updatedUser) {
                setUser(JSON.parse(updatedUser));
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);



    return { user, logOut };
}
