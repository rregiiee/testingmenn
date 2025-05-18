"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HumasDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // tunggu session
    if (!session) {
      router.push("/login"); // redirect kalau belum login
    } else if (session.user.role !== "humas") {
      router.push("/unauthorized"); // atau halaman gak boleh akses
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Humas</h1>
      <p>Selamat datang, {session.user.name || "User"}!</p>
      {/* Tambahin konten khusus Humas di sini */}

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
