"use client";

import { useEffect, useState } from "react";

type Summary = {
  totalSurat: number;
  prioritasTinggi: number;
  rataRataSkor: number;
  belumDitindaklanjuti: number;
};

type TopPriority = {
  nomor: string;
  pengirim: string;
  skor: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [topPriority, setTopPriority] = useState<TopPriority[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_LINK}Dashboard`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );

        const json = await res.json();

        setSummary(json.summary);
        setTopPriority(json.topPriority);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card title="Total Surat" value={summary.totalSurat} />
        <Card title="Prioritas Tinggi" value={summary.prioritasTinggi} />
        <Card title="Rata-rata Skor" value={summary.rataRataSkor} />
        <Card
          title="Belum Ditindaklanjuti"
          value={summary.belumDitindaklanjuti}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-4">Surat Prioritas Tertinggi</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Nomor Surat</th>
                <th className="p-3 text-left">Pengirim</th>
                <th className="p-3 text-center">Skor</th>
              </tr>
            </thead>

            <tbody>
              {topPriority.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3 font-medium">{item.nomor}</td>

                  <td className="p-3 text-gray-600">{item.pengirim}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 `}
                    >
                      {item.skor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-gray-800">{value}</h2>
    </div>
  );
}
