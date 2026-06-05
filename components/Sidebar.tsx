"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#C2B280] min-h-[calc(100vh-64px)] p-4">
      <ul className="space-y-2">
        <li>
          <button className="w-full text-left px-4 py-3 rounded-lg bg-white font-medium">
            Dashboard
          </button>
        </li>

        <li>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white">
            Arsip
          </button>
        </li>

        <li>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white">
            Kategori
          </button>
        </li>
      </ul>
    </aside>
  );
}
