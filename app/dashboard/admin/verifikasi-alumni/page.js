"use client";

import { useEffect, useState } from "react";

export default function VerifikasiAlumni() {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  async function fetchPending() {
    setLoading(true);
    try {
      const res = await fetch("/api/alumni-pending");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setPendingAlumni(data);
    } catch (error) {
      setMsg(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPending();
  }, []);

  async function handleUpdate(id, newStatus) {
    try {
      const res = await fetch("/api/alumni-update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      setMsg(data.message || "");

      if (res.ok) {
        // Refresh daftar
        fetchPending();
      }
    } catch (error) {
      setMsg("Gagal update status");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Verifikasi Akun Alumni</h1>

      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      {pendingAlumni.length === 0 && <p>Tidak ada akun alumni yang menunggu verifikasi.</p>}

      <div className="space-y-4">
        {pendingAlumni.map((alumni) => (
          <div key={alumni.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p><strong>Nama:</strong> {alumni.nama}</p>
              <p><strong>Email:</strong> {alumni.email}</p>
              <p><strong>No HP:</strong> {alumni.noHp || "-"}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdate(alumni.id, "active")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdate(alumni.id, "rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
