"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.replace("/Auth");
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-black">Manajemen Arsip</h1>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
      >
        Logout
      </button>
    </nav>
  );
}
