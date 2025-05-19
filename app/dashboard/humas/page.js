// Misal di halaman login client component
'use client'

import { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    try {
      // Query email berdasarkan username di Firestore
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('username', '==', username))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError('Username tidak ditemukan')
        return
      }

      const userData = querySnapshot.docs[0].data()
      const email = userData.email

      // Login pakai email & password Firebase Auth
      await signInWithEmailAndPassword(auth, email, password)

      // Redirect ke dashboard atau halaman lain
      router.push('/dashboard')
    } catch (err) {
      setError('Login gagal: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="mb-3 w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="mb-3 w-full p-2 border rounded"
      />

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  )
}
