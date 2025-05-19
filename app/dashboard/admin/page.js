'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pendingAlumni, setPendingAlumni] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
        return
      }

      // Ambil data user dari Firestore sesuai uid
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        router.push('/login')
        return
      }

      const userData = docSnap.data()
      if (userData.role !== 'admin') {
        router.push('/login')
        return
      }

      // Ambil alumni pending
      const alumniQuery = query(collection(db, 'users'), where('role', '==', 'alumni'), where('status', '==', 'pending'))
      const alumniSnapshot = await getDocs(alumniQuery)
      setPendingAlumni(alumniSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      setIsAdmin(true)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  async function approveAlumni(id) {
    try {
      const res = await fetch(`/api/approve/${id}`, {
        method: 'POST',
      })

      if (!res.ok) {
        throw new Error('Gagal approve user')
      }

      // Update list alumni pending setelah approve
      setPendingAlumni(pendingAlumni.filter(alumni => alumni.id !== id))
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>

  if (!isAdmin) return null

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin Kemahasiswaan</h1>

      <section className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Form Approve Alumni Pending</h2>
        {error && <p className="mb-3 text-red-600">{error}</p>}
        {pendingAlumni.length === 0 ? (
          <p className="text-gray-600">Tidak ada alumni yang perlu diapprove.</p>
        ) : (
          <ul>
            {pendingAlumni.map((alumni) => (
              <li key={alumni.id} className="flex justify-between items-center border-b border-gray-200 py-3">
                <div>
                  <p className="font-semibold">{alumni.nama}</p>
                  <p className="text-sm text-gray-600">Username: {alumni.username} | Email: {alumni.email}</p>
                </div>
                <button
                  onClick={() => approveAlumni(alumni.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        onClick={() => auth.signOut().then(() => router.push('/login'))}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
