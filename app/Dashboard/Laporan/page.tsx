"use client";

import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useEffect, useState } from "react";

interface Laporan {
  id: number;
  nomorSurat: string;
  pengirim: string;
  tanggalInput: string;
  status: string;
}

interface Laporan2 {
  id: number;
  nomorSurat: string;
  pengirim: string;
  tanggalInput: string;
  status: string;
}

const getNamaBulan = (bulan: string | number): string => {
  const daftarBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return daftarBulan[Number(bulan)] ?? "";
};

export default function LaporanPage() {
  const [data, setData] = useState<Laporan[]>([]);
  const [filteredData, setFilteredData] = useState<Laporan[]>([]);

  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getPeriodeLaporan = () => {
    if (!bulan && !tahun) {
      return "Periode : Semua Data";
    }

    if (bulan && tahun) {
      return `Periode : ${getNamaBulan(Number(bulan))} ${tahun}`;
    }

    if (bulan) {
      return `Periode : ${getNamaBulan(Number(bulan))} (Semua Tahun)`;
    }

    return `Periode : Tahun ${tahun}`;
  };

  const exportTableToPDF = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk dicetak.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // UKURAN HALAMAN
    const pageWidth = doc.internal.pageSize.getWidth();

    // JUDUL
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    doc.text("LAPORAN SURAT MASUK", pageWidth / 2, 20, {
      align: "center",
    });

    // PERIODE
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(getPeriodeLaporan(), pageWidth / 2, 28, {
      align: "center",
    });

    // JUMLAH SURAT
    doc.setFontSize(10);

    doc.text(`Jumlah Surat : ${filteredData.length}`, 14, 38);

    // DATA TABLE
    autoTable(doc, {
      startY: 44,

      head: [["No", "Nomor Surat", "Pengirim", "Tanggal", "Status"]],

      body: filteredData.map((item, index) => [
        String(index + 1),
        item.nomorSurat,
        item.pengirim,
        item.tanggalInput,
        item.status,
      ]),

      // TABLE STYLE

      theme: "grid",

      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        textColor: [0, 0, 0],
        valign: "middle",
      },

      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },

      bodyStyles: {
        textColor: [0, 0, 0],
      },

      alternateRowStyles: {
        fillColor: [250, 250, 250],
      },

      // COLUMN WIDTH & ALIGNMENT

      columnStyles: {
        0: {
          cellWidth: 12,
          halign: "center",
        },

        1: {
          cellWidth: 38,
          halign: "left",
        },

        2: {
          cellWidth: 48,
          halign: "left",
        },

        3: {
          cellWidth: 30,
          halign: "center",
        },

        4: {
          cellWidth: 42,
          halign: "center",
        },
      },

      // HEADER SETIAP HALAMAN

      showHead: "everyPage",

      // ROW TIDAK DIPOTONG

      rowPageBreak: "avoid",

      // MARGIN

      margin: {
        top: 15,
        right: 14,
        bottom: 20,
        left: 14,
      },

      // FOOTER SETIAP HALAMAN

      didDrawPage: (data) => {
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageNumber = doc.getNumberOfPages();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);

        doc.text(`Halaman ${pageNumber}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        });
      },
    });

    // NAMA FILE
    let namaFile = "laporan-surat";

    if (bulan && tahun) {
      namaFile += `-${getNamaBulan(Number(bulan)).toLowerCase()}-${tahun}`;
    } else if (bulan) {
      namaFile += `-${getNamaBulan(Number(bulan)).toLowerCase()}`;
    } else if (tahun) {
      namaFile += `-${tahun}`;
    } else {
      namaFile += "-semua-data";
    }

    // DOWNLOAD PDF
    doc.save(`${namaFile}.pdf`);

    // Tutup modal setelah generate PDF
    setShowModal(false);
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "1":
        return "Belum di Proses";

      case "2":
        return "Dalam Proses";

      case "3":
        return "Sudah Diproses";

      default:
        return "Tidak Diketahui";
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_LINK}laporan`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data laporan");
      }

      const result = await res.json();

      const data = result.data.map((item: any) => ({
        id: item.id,
        nomorSurat: item.nomorSurat,
        pengirim: item.judulSurat,
        tanggalInput: new Date(item.tanggalInput).toISOString().split("T")[0],
        status: getStatusName(item.status),
      }));

      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error(error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (bulan) {
      temp = temp.filter((item) => {
        const itemBulan = new Date(item.tanggalInput)
          .getMonth()
          .toString()
          .padStart(2, "0");

        return itemBulan === bulan;
      });
    }

    if (tahun) {
      temp = temp.filter(
        (item) =>
          new Date(item.tanggalInput).getFullYear().toString() === tahun,
      );
    }

    setFilteredData(temp);
  }, [bulan, tahun, data]);

  return (
    <div className="flex-1 p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Laporan Surat</h1>

      {/* FILTER */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          {/* BULAN */}
          <div>
            <label className="block text-sm mb-2">Bulan</label>

            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Semua Bulan</option>

              {[
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ].map((item, index) => (
                <option key={index} value={String(index).padStart(2, "0")}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* TAHUN */}
          <div>
            <label className="block text-sm mb-2">Tahun</label>

            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Semua Tahun</option>

              {[2024, 2025, 2026, 2027].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* RESET */}
          <button
            onClick={() => {
              setBulan("");
              setTahun("");
            }}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Reset Filter
          </button>

          {/* CETAK */}
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Cetak PDF
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-xl shadow p-5 mb-5 flex justify-between">
        <h2 className="font-semibold">Data Laporan</h2>

        <p>
          Total Surat :{" "}
          <span className="font-bold text-blue-600">{filteredData.length}</span>
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3 text-left">Nomor Surat</th>
              <th className="p-3 text-left">Pengirim</th>
              <th className="p-3">Tanggal Input</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredData?.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              filteredData?.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-center">{index + 1}</td>

                  <td className="p-3">{item.nomorSurat}</td>

                  <td className="p-3">{item.pengirim}</td>

                  <td className="p-3 text-center">{item.tanggalInput}</td>

                  <td className="p-3 text-center">
                    <span className="px-3 py-1 rounded-full  text-xs">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PREVIEW */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-5xl">
            <div className="overflow-y-auto max-h-[70vh]">
              <h2 className="text-2xl font-bold text-center mb-2">
                LAPORAN SURAT MASUK
              </h2>

              <p className="text-center mb-5">{getPeriodeLaporan()}</p>

              <p className="mb-4">
                Jumlah Surat : <b>{filteredData.length}</b>
              </p>

              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">No</th>
                    <th className="p-2">Nomor Surat</th>
                    <th className="p-2">Pengirim</th>
                    <th className="p-2">Tanggal Surat Masuk</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2 text-center">{index + 1}</td>

                      <td className="p-2">{item.nomorSurat}</td>

                      <td className="p-2">{item.pengirim}</td>

                      <td className="p-2 text-center">{item.tanggalInput}</td>

                      <td className="p-2 text-center">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTON MODAL */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Tutup
              </button>

              <button
                onClick={exportTableToPDF}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Cetak PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
