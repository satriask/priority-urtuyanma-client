"use client";
import { useEffect, useState, useMemo } from "react";

export default function DaftarSurat() {
  const [searchNomor, setSearchNomor] = useState("");
  const [searchPengirim, setSearchPengirim] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedSurat, setSelectedSurat] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 5;
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

  const handleUpdateStatus = async () => {
    if (!selectedSurat) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LINK}edit-status-surat/${selectedSurat.SuratId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            statusSurat: selectedStatus,
          }),
        },
      );

      console.log("response");
      console.log(response);
      console.log("response");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Status berhasil diubah");

      (
        document.getElementById("modal_detail_surat") as HTMLDialogElement
      )?.close();

      fetchDataSurat();
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "1":
        return <span className="badge badge-warning">Belum Diproses</span>;

      case "2":
        return <span className="badge badge-info">Dalam Proses</span>;

      case "3":
        return <span className="badge badge-success">Sudah Diproses</span>;

      default:
        return <span className="badge">Tidak diketahui</span>;
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

  const filteredArsip = useMemo(() => {
    return arsip.filter((item) => {
      const nomorMatch =
        !searchNomor ||
        item.nomorSurat
          ?.toString()
          .toLowerCase()
          .includes(searchNomor.toLowerCase());

      const pengirimMatch =
        !searchPengirim || String(item.C4) === String(searchPengirim);

      const statusMatch =
        !searchStatus || String(item.statusSurat) === String(searchStatus);

      return nomorMatch && pengirimMatch && statusMatch;
    });
  }, [arsip, searchNomor, searchPengirim, searchStatus]);

  const totalPage = Math.ceil(filteredArsip.length / itemPerPage);

  const paginatedArsip = filteredArsip.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage,
  );
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

  const deleteSurat = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LINK}delete-surat/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus surat");
      }
      alert(result.message);
      fetchDataSurat();
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleEditSurat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSurat) return;

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LINK}edit-surat/${selectedSurat.SuratId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengubah surat");
      }

      alert(result.message || "Surat berhasil diubah");

      (
        document.getElementById("modal_edit_surat") as HTMLDialogElement | null
      )?.close();

      fetchDataSurat(); // refresh data

      // optional: reset selected surat
      setSelectedSurat(null);
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Gagal mengubah surat");
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
            value={searchNomor}
            onChange={(e) => {
              setSearchNomor(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="border rounded-lg px-3 py-2"
            value={searchPengirim}
            onChange={(e) => {
              setSearchPengirim(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Semua Pengirim</option>
            <option value="5">Mabes Polri</option>
            <option value="4">Polda Metro Jaya</option>
            <option value="3">Instansi Pemerintah</option>
            <option value="2">Satker Internal</option>
            <option value="1">Masyarakat</option>
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

          <select
            className="border rounded-lg px-3 py-2"
            value={searchStatus}
            onChange={(e) => {
              setSearchStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Semua Status</option>
            <option value="1">Belum Diproses</option>
            <option value="2">Sedang Diproses</option>
            <option value="3">Sudah Diproses</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="button" className="bg-[#C2B280] px-4 py-2 rounded-lg">
            Cari
          </button>

          <button
            type="button"
            className="border px-4 py-2 rounded-lg"
            onClick={() => {
              setSearchNomor("");
              setSearchPengirim("");
              setSearchStatus("");
              setCurrentPage(1);
            }}
          >
            Reset
          </button>
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
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : paginatedArsip.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-10 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                paginatedArsip.map((item, index) => (
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
                        <button
                          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                          onClick={() => {
                            setSelectedSurat(item);
                            setSelectedStatus(item.statusSurat);

                            (
                              document.getElementById(
                                "modal_detail_surat",
                              ) as HTMLDialogElement
                            )?.showModal();
                          }}
                        >
                          Detail
                        </button>
                        <dialog id="modal_detail_surat" className="modal">
                          <div className="modal-box max-w-5xl">
                            <h3 className="font-bold text-2xl mb-6">
                              Detail Surat
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                              {/* GAMBAR */}
                              <div>
                                <img
                                  src={selectedSurat?.fileSurat}
                                  alt="Surat"
                                  className="rounded-lg border w-full object-cover"
                                />
                              </div>

                              {/* DETAIL */}
                              <div className="space-y-4">
                                <div>
                                  <p className="font-semibold">Judul Surat</p>
                                  <p>{selectedSurat?.judulSurat}</p>
                                </div>

                                <div>
                                  <p className="font-semibold">Nomor Surat</p>
                                  <p>{selectedSurat?.nomorSurat}</p>
                                </div>

                                <div>
                                  <p className="font-semibold">Tanggal Surat</p>
                                  <p>
                                    {selectedSurat?.tanggalSurat?.split("T")[0]}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-semibold">
                                    Status Saat Ini
                                  </p>

                                  {getStatusBadge(selectedSurat?.statusSurat)}
                                </div>

                                <hr />

                                <div>
                                  <p className="font-semibold mb-2">
                                    Nilai Kriteria
                                  </p>

                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>C1 : {selectedSurat?.C1}</div>
                                    <div>C2 : {selectedSurat?.C2}</div>
                                    <div>C3 : {selectedSurat?.C3}</div>
                                    <div>C4 : {selectedSurat?.C4}</div>
                                    <div>C5 : {selectedSurat?.C5}</div>

                                    <div>
                                      Ranking : {selectedSurat?.ranking}
                                    </div>

                                    {/* <div>Skor : {selectedSurat?.skor}</div> */}
                                  </div>
                                </div>

                                <hr />

                                <div>
                                  <label className="font-semibold">
                                    Ubah Status
                                  </label>

                                  <select
                                    className="select select-bordered w-full mt-2"
                                    value={selectedStatus}
                                    onChange={(e) =>
                                      setSelectedStatus(e.target.value)
                                    }
                                  >
                                    <option value="1">Belum Diproses</option>

                                    <option value="2">Dalam Proses</option>

                                    <option value="3">Sudah Diproses</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="modal-action">
                              <button
                                className="btn btn-primary"
                                onClick={handleUpdateStatus}
                              >
                                Simpan Status
                              </button>

                              <form method="dialog">
                                <button className="btn">Tutup</button>
                              </form>
                            </div>
                          </div>

                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                        <button
                          className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                          onClick={() => {
                            setSelectedSurat(item);

                            (
                              document.getElementById(
                                "modal_edit_surat",
                              ) as HTMLDialogElement | null
                            )?.showModal();
                          }}
                        >
                          Edit
                        </button>
                        <dialog id="modal_edit_surat" className="modal">
                          <div className="modal-box max-w-2xl">
                            <form onSubmit={handleEditSurat}>
                              <h3 className="font-bold text-lg mb-4">
                                Edit Surat
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                  name="judulSurat"
                                  type="text"
                                  className="input input-bordered w-full"
                                  defaultValue={selectedSurat?.judulSurat}
                                />

                                <input
                                  name="nomorSurat"
                                  type="text"
                                  className="input input-bordered w-full"
                                  defaultValue={selectedSurat?.nomorSurat}
                                />

                                <input
                                  name="tanggalSurat"
                                  type="date"
                                  className="input input-bordered w-full"
                                  defaultValue={
                                    selectedSurat?.tanggalSurat?.split("T")[0]
                                  }
                                />

                                <select
                                  name="C1"
                                  className="select select-bordered w-full"
                                  defaultValue={selectedSurat?.C1}
                                >
                                  <option value="5">Sangat Mendesak</option>
                                  <option value="4">Mendesak</option>
                                  <option value="3">Cukup Mendesak</option>
                                  <option value="2">Kurang Mendesak</option>
                                  <option value="1">Tidak Mendesak</option>
                                </select>

                                <select
                                  name="C2"
                                  className="select select-bordered w-full"
                                  defaultValue={selectedSurat?.C2}
                                >
                                  <option value="5">Sangat Penting</option>
                                  <option value="4">Penting</option>
                                  <option value="3">Cukup Penting</option>
                                  <option value="2">Kurang Penting</option>
                                  <option value="1">Tidak Penting</option>
                                </select>

                                <select
                                  name="C3"
                                  className="select select-bordered w-full"
                                  defaultValue={selectedSurat?.C3}
                                >
                                  <option value="5">≤ 1 Hari</option>
                                  <option value="4">2–3 Hari</option>
                                  <option value="3">4–7 Hari</option>
                                  <option value="2">8–14 Hari</option>
                                  <option value="1">&gt;14 Hari</option>
                                </select>

                                <select
                                  name="C4"
                                  className="select select-bordered w-full"
                                  defaultValue={selectedSurat?.C4}
                                >
                                  <option value="5">Mabes Polri</option>
                                  <option value="4">Polda Metro Jaya</option>
                                  <option value="3">Instansi Pemerintah</option>
                                  <option value="2">
                                    Satuan Kerja Internal
                                  </option>
                                  <option value="1">
                                    Masyarakat / Perorangan
                                  </option>
                                </select>

                                <select
                                  name="C5"
                                  className="select select-bordered w-full"
                                  defaultValue={selectedSurat?.C5}
                                >
                                  <option value="5">Sangat Besar</option>
                                  <option value="4">Besar</option>
                                  <option value="3">Sedang</option>
                                  <option value="2">Kecil</option>
                                  <option value="1">Sangat Kecil</option>
                                </select>
                              </div>

                              <div className="mt-4">
                                <label className="label">
                                  <span className="label-text">
                                    Upload Surat Baru (Opsional)
                                  </span>
                                </label>

                                <input
                                  name="surat"
                                  type="file"
                                  accept="image/*"
                                  className="file-input file-input-bordered w-full"
                                />
                              </div>

                              <div className="modal-action">
                                <button className="btn btn-primary">
                                  Simpan Perubahan
                                </button>
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

                        <button
                          onClick={() => deleteSurat(item.id)}
                          className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            {filteredArsip.length === 0
              ? 0
              : (currentPage - 1) * itemPerPage + 1}
            {" - "}
            {Math.min(currentPage * itemPerPage, filteredArsip.length)}
            {" dari "}
            {filteredArsip.length} data
          </p>

          <div className="flex gap-2">
            <button
              className="border px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span className="bg-[#C2B280] px-3 py-1 rounded">
              {currentPage}
            </span>

            <button
              className="border px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === totalPage || totalPage === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
