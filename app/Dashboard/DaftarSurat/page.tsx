"use client";

export default function DaftarSurat() {
  const arsip = [
    {
      id: 1,
      nomor: "B/001/VI/2026",
      pengirim: "Mabes Polri",
      tanggalMasuk: "01-06-2026",

      c1: 5,
      c2: 5,
      c3: 5,
      c4: 5,
      c5: 5,

      skorMoora: 0.92,
      ranking: 1,

      status: "Belum Ditindaklanjuti",
    },
    {
      id: 2,
      nomor: "B/002/VI/2026",
      pengirim: "Polda Metro Jaya",
      tanggalMasuk: "02-06-2026",

      c1: 4,
      c2: 5,
      c3: 4,
      c4: 4,
      c5: 5,

      skorMoora: 0.89,
      ranking: 2,

      status: "Diproses",
    },
    {
      id: 3,
      nomor: "B/003/VI/2026",
      pengirim: "Instansi Pemerintah",
      tanggalMasuk: "03-06-2026",

      c1: 4,
      c2: 4,
      c3: 3,
      c4: 3,
      c5: 4,

      skorMoora: 0.81,
      ranking: 3,

      status: "Diproses",
    },
    {
      id: 4,
      nomor: "B/004/VI/2026",
      pengirim: "Satker Internal",
      tanggalMasuk: "04-06-2026",

      c1: 3,
      c2: 3,
      c3: 3,
      c4: 2,
      c5: 3,

      skorMoora: 0.69,
      ranking: 4,

      status: "Selesai",
    },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Surat Masuk</h1>

        <button className="bg-[#C2B280] px-4 py-2 rounded-lg font-medium hover:opacity-90">
          + Tambah Surat
        </button>
      </div>

      {/* Keterangan */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-3">Keterangan Kriteria Penilaian</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          <p>
            <b>C1</b> : Tingkat Urgensi Surat
          </p>

          <p>
            <b>C2</b> : Tingkat Kepentingan Surat
          </p>

          <p>
            <b>C3</b> : Batas Waktu Tindak Lanjut
          </p>

          <p>
            <b>C4</b> : Sumber / Pengirim Surat
          </p>

          <p>
            <b>C5</b> : Dampak Keterlambatan
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="font-semibold mb-4">Filter Pencarian</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Nomor Surat"
            className="border rounded-lg px-3 py-2"
          />

          <select className="border rounded-lg px-3 py-2">
            <option>Semua Pengirim</option>
            <option>Mabes Polri</option>
            <option>Polda Metro Jaya</option>
            <option>Instansi Pemerintah</option>
            <option>Satker Internal</option>
            <option>Masyarakat</option>
          </select>

          <select className="border rounded-lg px-3 py-2">
            <option>Semua Urgensi</option>
            <option>Sangat Mendesak</option>
            <option>Mendesak</option>
            <option>Cukup Mendesak</option>
            <option>Kurang Mendesak</option>
            <option>Tidak Mendesak</option>
          </select>

          <input type="date" className="border rounded-lg px-3 py-2" />

          <input type="date" className="border rounded-lg px-3 py-2" />

          <select className="border rounded-lg px-3 py-2">
            <option>Semua Status</option>
            <option>Belum Ditindaklanjuti</option>
            <option>Diproses</option>
            <option>Selesai</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="bg-[#C2B280] px-4 py-2 rounded-lg">Cari</button>

          <button className="border px-4 py-2 rounded-lg">Reset</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-4">Data Surat Masuk</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Nomor Surat</th>
                <th className="p-3 text-left">Pengirim</th>

                <th className="p-3 text-center">C1</th>
                <th className="p-3 text-center">C2</th>
                <th className="p-3 text-center">C3</th>
                <th className="p-3 text-center">C4</th>
                <th className="p-3 text-center">C5</th>

                <th className="p-3 text-center">Skor</th>

                <th className="p-3 text-center">Ranking</th>

                <th className="p-3 text-center">Status</th>

                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {arsip.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">{item.nomor}</td>

                  <td className="p-3">{item.pengirim}</td>

                  <td className="p-3 text-center">{item.c1}</td>

                  <td className="p-3 text-center">{item.c2}</td>

                  <td className="p-3 text-center">{item.c3}</td>

                  <td className="p-3 text-center">{item.c4}</td>

                  <td className="p-3 text-center">{item.c5}</td>

                  <td className="p-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {item.skorMoora}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="font-bold text-[#C2B280]">
                      #{item.ranking}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Belum Ditindaklanjuti"
                          ? "bg-red-100 text-red-700"
                          : item.status === "Diproses"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                        Detail
                      </button>

                      <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Edit
                      </button>

                      <button className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-500">Menampilkan 1 - 4 dari 4 data</p>

          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded">Prev</button>

            <button className="bg-[#C2B280] px-3 py-1 rounded">1</button>

            <button className="border px-3 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
