'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function DashboardDosen() {
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      if (!auth.currentUser) {
        router.push('/login')
        return
      }

      const uid = auth.currentUser.uid
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        router.push('/login')
        return
      }

      const data = docSnap.data()
      if (data.role !== 'dosen') {
        router.push('/login')
        return
      }

      setUserData(data)
    }

    fetchUserData()
  }, [router])

  if (!userData) return <p>Loading...</p>

  return (
    <div>
      <h1>Dashboard Dosen</h1>
      <p>Halo, {userData.nama}</p>
      {/* konten dashboard */}
    </div>
  )
}
