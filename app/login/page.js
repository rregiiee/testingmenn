'use client'
import { auth } from '@/lib/firebase'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { signInWithEmailAndPassword } from 'firebase/auth'
export default function LoginPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
  e.preventDefault()
  setMessage('')
  setLoading(true)

  const form = e.target
  const username = form.username.value.trim()
  const password = form.password.value.trim()

  if (!username || !password) {
    setMessage('Isi lengkap username dan password')
    setLoading(false)
    return
  }

  try {
    // 1. Cari user berdasarkan username di Firestore dulu untuk dapat email
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      setMessage('User tidak ditemukan')
      setLoading(false)
      return
    }

    const userDoc = snapshot.docs[0]
    const user = userDoc.data()

    if (user.status !== 'active') {
      setMessage('Akun belum aktif')
      setLoading(false)
      return
    }

    // 2. Sign in dengan Firebase Auth pakai email & password
    await signInWithEmailAndPassword(auth, user.email, password)

    // 3. Redirect sesuai role
    switch (user.role) {
      case 'admin':
        router.push('/dashboard/admin')
        break
      case 'humas':
        router.push('/dashboard/humas')
        break
      case 'dosen':
        router.push('/dashboard/dosen')
        break
      case 'pimpinan':
        router.push('/dashboard/pimpinan')
        break
      case 'alumni':
        router.push('/dashboard/alumni')
        break
      default:
        router.push('/')
    }
    } catch (error) {
      console.error(error)
      setMessage('Terjadi kesalahan server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-blue-100 flex items-center justify-center py-12">
        <img src="/logoo.png" alt="Logo" className="max-w-xs md:max-w-sm h-auto" />
      </div>

      <div className="md:w-1/2 w-full bg-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-extrabold text-black mb-6 text-center">LOGIN FORM</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-black">Username</label>
              <input
                name="username"
                type="text"
                placeholder="akunnya: alumni1, admin1, dosen1"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-black">Password</label>
              <input
                name="password"
                type="password"
                placeholder="akunnya: alumni1, admin1, dosen1"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
