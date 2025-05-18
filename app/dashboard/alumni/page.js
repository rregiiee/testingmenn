"use client";

import { useSession, signOut } from "next-auth/react";

export default function AlumniDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat Datang, {session.user?.nama || session.user?.name || "Alumni"}!
        </h1>
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

      <main>
        <p>Ini adalah dashboard alumni. Kamu bisa lihat info terbaru di sini.</p>
      </main>
    </div>
  );
}
