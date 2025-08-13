import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);

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


    return { user };
}
