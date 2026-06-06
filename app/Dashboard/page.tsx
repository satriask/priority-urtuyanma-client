export default function DashboardPage() {
  const topPriority = [
    {
      nomor: "B/001/VI/2026",
      pengirim: "Mabes Polri",
      skor: 0.92,
    },
    {
      nomor: "B/002/VI/2026",
      pengirim: "Polda Metro Jaya",
      skor: 0.89,
    },
    {
      nomor: "B/003/VI/2026",
      pengirim: "Instansi Pemerintah",
      skor: 0.85,
    },
  ];

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5">
          <p>Total Surat</p>
          <h2 className="text-3xl font-bold">105</h2>
        </div>

        <div className="bg-white rounded-xl p-5">
          <p>Prioritas Tinggi</p>
          <h2 className="text-3xl font-bold">15</h2>
        </div>

        <div className="bg-white rounded-xl p-5">
          <p>Rata-rata Skor</p>
          <h2 className="text-3xl font-bold">0.78</h2>
        </div>

        <div className="bg-white rounded-xl p-5">
          <p>Belum Ditindaklanjuti</p>
          <h2 className="text-3xl font-bold">28</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5">
        <h2 className="font-semibold mb-4">Surat Prioritas Tertinggi</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nomor Surat</th>
                <th className="px-4 py-3 text-left">Pengirim</th>
                <th className="px-4 py-3 text-center">Skor MOORA</th>
              </tr>
            </thead>

            <tbody>
              {topPriority.map((item, index) => (
                <tr
                  key={item.nomor}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 font-medium">{item.nomor}</td>

                  <td className="px-4 py-3">{item.pengirim}</td>

                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
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
