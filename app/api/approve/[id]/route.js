import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export async function POST(req, { params }) {
  const { id } = params

  try {
    const userRef = doc(db, 'users', id)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return new Response(JSON.stringify({ message: 'User tidak ditemukan' }), { status: 404 })
    }

    const data = userSnap.data()

    if (data.status === 'active') {
      return new Response(JSON.stringify({ message: 'User sudah aktif' }), { status: 400 })
    }

    // Update status user jadi 'active'
    await updateDoc(userRef, {
      status: 'active',
      updatedAt: new Date(),
    })

    return new Response(JSON.stringify({ message: 'User berhasil diapprove' }), { status: 200 })
  } catch (error) {
    console.error('Error approve user:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan saat approve' }), { status: 500 })
  }
}
