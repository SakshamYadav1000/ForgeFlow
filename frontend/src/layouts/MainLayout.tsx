import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import TopNavbar from "../components/layout/TopNavbar";
import { Building2 } from "lucide-react";

import {
    LayoutDashboard,
    FolderKanban,
    Bug,
    Bell,
    User,
} from "lucide-react";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({
    children,
}: MainLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">
                <div className="p-6 text-2xl font-bold">
                    ForgeFlow
                </div>

                <nav className="space-y-2 px-4">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <FolderKanban size={20} />
                        Projects
                    </NavLink>

                    <NavLink
                        to="/issues"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <Bug size={20} />
                        Issues
                    </NavLink>

                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <Bell size={20} />
                        Notifications
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <User size={20} />
                        Profile
                    </NavLink>

                    <NavLink
                        to="/organizations"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <Building2 size={20} />
                        Organizations
                    </NavLink>

                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <TopNavbar />

                {children}
            </main>
        </div >
    );
}