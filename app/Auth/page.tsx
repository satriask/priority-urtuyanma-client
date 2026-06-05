"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(process.env.NEXT_PUBLIC_URL_LINK);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_LINK}Auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      localStorage.setItem("access_token", data.access_token);

      toast.success("Login berhasil");

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4E3] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#C2B280]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black">Manajemen Arsip</h1>

          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-black">
              Username
            </label>

            <input
              type="text"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              className="w-full rounded-lg border border-[#C2B280] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C2B280]"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full rounded-lg border border-[#C2B280] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C2B280]"
              placeholder="Masukkan password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-[#F8F4E3] py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}
