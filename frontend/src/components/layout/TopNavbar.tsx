import { LogOut, UserCircle } from "lucide-react";

export default function TopNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="mb-8 flex items-center justify-between rounded-xl bg-white p-5 shadow">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          ForgeFlow
        </h1>

        <p className="text-sm text-gray-500">
          Project Management Dashboard
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={28} />
          <span className="font-medium">
            Saksham
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}