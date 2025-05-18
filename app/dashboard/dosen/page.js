"use client";

import { useSession, signOut } from "next-auth/react";

export default function DosenDashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Dosen</h1>
      <p>Selamat datang, {session.user.name}!</p>
      <p>Role kamu: {session.user.role}</p>
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

    </div>
  );
}
