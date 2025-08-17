import { Boxes } from "lucide-react";
import React from "react";
import { Link } from "react-router"; // ✅ use react-router-dom not "react-router"
import { useAuth } from "../../hooks/useAuth";

const DashboardMenu = () => {
    const { user } = useAuth();
    console.log("User:", user);

    const adminLinks = [
        { id: 1, label: "Manage Products", link: "/dashboard/all-products" },
        { id: 2, label: "Manage Orders", link: "/dashboard/orders" },
        { id: 3, label: "Manage Categories", link: "/dashboard/categories" },
        { id: 4, label: "Website Settings", link: "/dashboard/settings" },
    ];

    const userLinks = [
        { id: 1, label: "My Orders", link: "/dashboard/my-orders" },
        { id: 2, label: "My Profile", link: "/dashboard/my-profile" },
        { id: 3, label: "My Shipping Address", link: "/dashboard/shipping-address" },
    ];

    const links =
        user?.role === "admin"
            ? adminLinks
            : user?.role === "user"
                ? userLinks
                : [];

    return (
        <div>
            <ul className="space-y-3">
                {links.map((menu) => (
                    <li key={menu.id} className="flex gap-3 items-center">
                        <Boxes className="w-5 h-5" />
                        <Link to={menu.link}>{menu.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardMenu;
