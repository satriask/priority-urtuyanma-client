"use client";
import { useEffect, useState } from "react";

export default function DaftarSurat() {
  // const arsip = [
  //   // {
  //   //   id: 1,
  //   //   nomor: "B/001/VI/2026",
  //   //   pengirim: "Mabes Polri",
  //   //   tanggalMasuk: "01-06-2026",
  //   //   c1: 5,
  //   //   c2: 5,
  //   //   c3: 5,
  //   //   c4: 5,
  //   //   c5: 5,
  //   //   skorMoora: 0.92,
  //   //   ranking: 1,
  //   //   status: "Belum Ditindaklanjuti",
  //   // },
  //   // {
  //   //   id: 2,
  //   //   nomor: "B/002/VI/2026",
  //   //   pengirim: "Polda Metro Jaya",
  //   //   tanggalMasuk: "02-06-2026",
  //   //   c1: 4,
  //   //   c2: 5,
  //   //   c3: 4,
  //   //   c4: 4,
  //   //   c5: 5,
  //   //   skorMoora: 0.89,
  //   //   ranking: 2,
  //   //   status: "Diproses",
  //   // },
  //   // {
  //   //   id: 3,
  //   //   nomor: "B/003/VI/2026",
  //   //   pengirim: "Instansi Pemerintah",
  //   //   tanggalMasuk: "03-06-2026",
  //   //   c1: 4,
  //   //   c2: 4,
  //   //   c3: 3,
  //   //   c4: 3,
  //   //   c5: 4,
  //   //   skorMoora: 0.81,
  //   //   ranking: 3,
  //   //   status: "Diproses",
  //   // },
  //   // {
  //   //   id: 4,
  //   //   nomor: "B/004/VI/2026",
  //   //   pengirim: "Satker Internal",
  //   //   tanggalMasuk: "04-06-2026",
  //   //   c1: 3,
  //   //   c2: 3,
  //   //   c3: 3,
  //   //   c4: 2,
  //   //   c5: 3,
  //   //   skorMoora: 0.69,
  //   //   ranking: 4,
  //   //   status: "Selesai",
  //   // },
  // ];

  const [arsip, setArsip] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataSurat();
  }, []);

  const handleCreateSurat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;

      const formData = new FormData(form);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LINK}create-surat`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal membuat surat");
      }

      alert("Surat berhasil dibuat");

      form.reset();

      (
        document.getElementById(
          "modal_tambah_surat",
        ) as HTMLDialogElement | null
      )?.close();

      console.log(result);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  const getPengirim = (c4: number) => {
    switch (c4) {
      case 1:
        return "Masyarakat / Perorangan";
      case 2:
        return "Satuan Kerja Internal";
      case 3:
        return "Instansi Pemerintah";
      case 4:
        return "Polda Metro Jaya";
      case 5:
        return "Mabes Polri";
      default:
        return "-";
    }
  };

  const fetchDataSurat = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LINK}get-surat`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      console.log(result.data);

      setArsip(result.data);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusSurat = (status: string | number) => {
    switch (String(status)) {
      case "1":
        return {
          label: "Belum Diproses",
          className: "bg-red-100 text-red-700",
        };

      case "2":
        return {
          label: "Sedang Diproses",
          className: "bg-blue-100 text-blue-700",
        };

      case "3":
        return {
          label: "Sudah Diproses",
          className: "bg-green-100 text-green-700",
        };

      default:
        return {
          label: "-",
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Surat Masuk</h1>

        <button
          className="bg-[#C2B280] px-4 py-2 rounded-lg font-medium hover:opacity-90"
          onClick={() =>
            (
              document.getElementById(
                "modal_tambah_surat",
              ) as HTMLDialogElement | null
            )?.showModal()
          }
        >
          + Tambah Surat
        </button>

        <dialog id="modal_tambah_surat" className="modal">
          <div className="modal-box max-w-2xl">
            <form onSubmit={handleCreateSurat}>
              <h3 className="font-bold text-lg mb-4">Tambah Surat</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="judulSurat"
                  type="text"
                  placeholder="Judul Surat"
                  className="input input-bordered w-full"
                />

                <input
                  name="nomorSurat"
                  type="text"
                  placeholder="Nomor Surat"
                  className="input input-bordered w-full"
                />

                <input
                  name="tanggalSurat"
                  type="date"
                  className="input input-bordered w-full"
                />

                {/* C1 */}
                <select
                  name="C1"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    C1 - Tingkat Urgensi
                  </option>
                  <option value="5">Sangat Mendesak</option>
                  <option value="4">Mendesak</option>
                  <option value="3">Cukup Mendesak</option>
                  <option value="2">Kurang Mendesak</option>
                  <option value="1">Tidak Mendesak</option>
                </select>

                {/* C2 */}
                <select
                  name="C2"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    C2 - Tingkat Kepentingan
                  </option>
                  <option value="5">Sangat Penting</option>
                  <option value="4">Penting</option>
                  <option value="3">Cukup Penting</option>
                  <option value="2">Kurang Penting</option>
                  <option value="1">Tidak Penting</option>
                </select>

                {/* C3 */}
                <select
                  name="C3"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    C3 - Batas Waktu
                  </option>
                  <option value="5">≤ 1 Hari</option>
                  <option value="4">2–3 Hari</option>
                  <option value="3">4–7 Hari</option>
                  <option value="2">8–14 Hari</option>
                  <option value="1">&gt; 14 Hari</option>
                </select>

                {/* C4 */}
                <select
                  name="C4"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    C4 - Pengirim
                  </option>
                  <option value="5">Mabes Polri</option>
                  <option value="4">Polda Metro Jaya</option>
                  <option value="3">Instansi Pemerintah</option>
                  <option value="2">Satuan Kerja Internal</option>
                  <option value="1">Masyarakat / Perorangan</option>
                </select>

                {/* C5 */}
                <select
                  name="C5"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    C5 - Dampak Keterlambatan
                  </option>
                  <option value="5">Sangat Besar</option>
                  <option value="4">Besar</option>
                  <option value="3">Sedang</option>
                  <option value="2">Kecil</option>
                  <option value="1">Sangat Kecil</option>
                </select>
              </div>

              {/* Upload Surat */}
              <div className="mt-4">
                <label className="label">
                  <span className="label-text">Upload Gambar Surat</span>
                </label>

                <input
                  name="surat"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button className="btn btn-primary">Simpan</button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Batal</button>
              </form>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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

                <th className="p-3 w-36 text-center">Status</th>

                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {arsip.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">{item.nomorSurat}</td>

                  <td className="p-3">{getPengirim(item.C4)}</td>

                  <td className="p-3 text-center">{item.C1}</td>

                  <td className="p-3 text-center">{item.C2}</td>

                  <td className="p-3 text-center">{item.C3}</td>

                  <td className="p-3 text-center">{item.C4}</td>

                  <td className="p-3 text-center">{item.C5}</td>

                  <td className="p-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {item.skor}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span className="font-bold text-[#C2B280]">
                      #{item.ranking}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {(() => {
                      const status = getStatusSurat(item.statusSurat);

                      return (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      );
                    })()}
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
