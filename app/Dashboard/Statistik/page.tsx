export default function StatistikPage() {
  const statistikUrgensi = [
    {
      label: "Sangat Mendesak",
      jumlah: 25,
    },
    {
      label: "Mendesak",
      jumlah: 35,
    },
    {
      label: "Cukup Mendesak",
      jumlah: 22,
    },
    {
      label: "Kurang Mendesak",
      jumlah: 15,
    },
    {
      label: "Tidak Mendesak",
      jumlah: 8,
    },
  ];

  const statistikPengirim = [
    {
      label: "Mabes Polri",
      jumlah: 20,
    },
    {
      label: "Polda Metro Jaya",
      jumlah: 35,
    },
    {
      label: "Instansi Pemerintah",
      jumlah: 18,
    },
    {
      label: "Satker Internal",
      jumlah: 22,
    },
    {
      label: "Masyarakat",
      jumlah: 10,
    },
  ];

  const prioritas = [
    {
      surat: "B/001/VI/2026",
      skor: 0.92,
      ranking: 1,
    },
    {
      surat: "B/002/VI/2026",
      skor: 0.89,
      ranking: 2,
    },
    {
      surat: "B/003/VI/2026",
      skor: 0.85,
      ranking: 3,
    },
    {
      surat: "B/004/VI/2026",
      skor: 0.82,
      ranking: 4,
    },
    {
      surat: "B/005/VI/2026",
      skor: 0.8,
      ranking: 5,
    },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Statistik Surat Masuk</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Total Surat</p>

          <h2 className="text-3xl font-bold mt-2">105</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Prioritas Tinggi</p>

          <h2 className="text-3xl font-bold mt-2">15</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Belum Ditindaklanjuti</p>

          <h2 className="text-3xl font-bold mt-2">28</h2>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        {/* Statistik Urgensi */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold mb-4">
            Distribusi C1 - Tingkat Urgensi
          </h2>

          <div className="space-y-4">
            {statistikUrgensi.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span>{item.label}</span>
                  <span>{item.jumlah}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-[#C2B280] h-4 rounded-full"
                    style={{
                      width: `${item.jumlah * 2}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistik Pengirim */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold mb-4">Distribusi C4 - Pengirim Surat</h2>

          <div className="space-y-4">
            {statistikPengirim.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span>{item.label}</span>
                  <span>{item.jumlah}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${item.jumlah * 2}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prioritas */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="font-semibold mb-4">
          Top 5 Prioritas Surat (Hasil MOORA)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Ranking</th>

                <th className="p-3 text-left">Nomor Surat</th>

                <th className="p-3 text-center">Skor MOORA</th>
              </tr>
            </thead>

            <tbody>
              {prioritas.map((item) => (
                <tr key={item.surat} className="border-t">
                  <td className="p-3 font-bold text-[#C2B280]">
                    #{item.ranking}
                  </td>

                  <td className="p-3">{item.surat}</td>

                  <td className="p-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {item.skor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-4">Ringkasan Analisis</h2>

        <ul className="space-y-2 list-disc pl-5">
          <li>Total surat masuk sebanyak 105 surat.</li>

          <li>Mayoritas surat berada pada kategori "Mendesak".</li>

          <li>Pengirim surat terbanyak berasal dari Polda Metro Jaya.</li>

          <li>
            Terdapat 15 surat dengan prioritas tinggi yang perlu segera
            ditindaklanjuti.
          </li>

          <li>
            Surat B/001/VI/2026 memperoleh skor MOORA tertinggi yaitu 0.92.
          </li>
        </ul>
      </div>
    </div>
  );
}
