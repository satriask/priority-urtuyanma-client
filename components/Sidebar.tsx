"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="w-64 bg-[#C2B280] min-h-[calc(100vh-64px)] p-4">
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              router.push("/Dashboard");
            }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white  font-medium"
          >
            Dashboard
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              router.push("/Dashboard/DaftarSurat");
            }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white"
          >
            Daftar Surat
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              router.push("/Dashboard/Statistik");
            }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white"
          >
            Statistik
          </button>
        </li>
      </ul>
    </aside>
  );
}
