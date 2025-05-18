"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
       <button
  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
  onClick={() => {
    if (confirm("Apakah kamu yakin ingin logout?")) {
      signOut({ callbackUrl: "/" });
    }
  }}
>
  Logout
</button>


      </header>

      <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link
          href="/dashboard/admin/data-alumni"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Data Alumni</h2>
          <p>View, Approve akun, Kelola data alumni</p>
        </Link>

        <Link
          href="/dashboard/admin/kuesioner-pekerjaan"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Kuesioner Pekerjaan</h2>
          <p>Lihat & Kelola kuesioner pekerjaan alumni</p>
        </Link>

        <Link
          href="/dashboard/admin/statistik-lulusan"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Statistik Lulusan</h2>
          <p>Analisis data lulusan</p>
        </Link>

        <Link
          href="/dashboard/admin/hubungan-institusi"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Hubungan Institusi</h2>
          <p>Kelola kemitraan & hubungan institusi</p>
        </Link>

        <Link
          href="/dashboard/admin/manajemen-user"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manajemen User</h2>
          <p>Buat dan edit akun admin, humas, dosen wali</p>
        </Link>

        <Link
          href="/dashboard/admin/verifikasi-alumni"
          className="block bg-white p-6 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Verifikasi Akun Alumni</h2>
          <p>Verifikasi akun alumni yang baru daftar</p>
        </Link>
      </nav>
    </div>
  );
}
