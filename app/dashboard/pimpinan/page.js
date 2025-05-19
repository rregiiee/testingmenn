'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function PimpinanDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const user = auth.currentUser
      if (!user) {
        router.push('/login')
        return
      }

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        router.push('/login')
        return
      }

      const data = docSnap.data()
      if (data.role !== 'pimpinan') {
        router.push('/login')
        return
      }

      setUserData(data)
      setLoading(false)
    }

    fetchUser()
  }, [router])

  if (loading) return <p>Loading...</p>
  if (!userData) return null

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Pimpinan</h1>
      <p>Selamat datang, {userData.nama}!</p>
      <p>Role kamu: {userData.role}</p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
        onClick={() => auth.signOut().then(() => router.push('/login'))}
      >
        Logout
      </button>
    </div>
  )
}
