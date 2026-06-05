"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/Auth");
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-[#F8F4E3]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="mt-2 text-gray-600">
              Selamat datang di sistem Manajemen Arsip.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
