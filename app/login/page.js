"use client";
import { signIn, getSession } from "next-auth/react";


import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      // Ambil session terbaru, untuk dapat role user
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "humas") router.push("/dashboard/humas");
      else if (role === "pimpinan") router.push("/dashboard/pimpinan");
      else if (role === "dosen") router.push("/dashboard/dosen");
      else if (role === "alumni") router.push("/dashboard/alumni");
      else router.push("/dashboard");
    } else {
      setMessage(res.error || "Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Kiri: Logo Area */}
      <div className="md:w-1/2 w-full bg-blue-100 flex items-center justify-center py-12">
        <img src="/logoo.png" alt="Logo" className="max-w-xs md:max-w-sm h-auto" />
      </div>

      {/* Kanan: Login Form */}
      <div className="md:w-1/2 w-full bg-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-extrabold text-black mb-6 text-center">LOGIN FORM</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-black">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter Your Username"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-black">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter Your password"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
