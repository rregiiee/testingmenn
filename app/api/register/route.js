import { db, auth } from '@/lib/firebase'
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const body = await req.json()
    const { nama, username, password, noHp, email } = body

    if (!nama || !username || !password || !noHp || !email) {
      return new Response(JSON.stringify({ message: 'Semua field wajib diisi' }), { status: 400 })
    }

    const usersRef = collection(db, 'users')

    // Cek username sudah ada atau belum
    const usernameQuery = query(usersRef, where('username', '==', username))
    const usernameSnapshot = await getDocs(usernameQuery)
    if (!usernameSnapshot.empty) {
      return new Response(JSON.stringify({ message: 'Username sudah digunakan' }), { status: 400 })
    }

    // Cek email sudah ada atau belum
    const emailQuery = query(usersRef, where('email', '==', email))
    const emailSnapshot = await getDocs(emailQuery)
    if (!emailSnapshot.empty) {
      return new Response(JSON.stringify({ message: 'Email sudah digunakan' }), { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Buat user di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Simpan data user di Firestore dengan UID dari Firebase Auth
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      nama,
      username,
      password: hashedPassword,
      rawPassword: password, // sebenarnya jangan simpan raw password di production
      nohp: noHp,
      email,
      role: 'alumni',
      status: 'pending', // supaya admin bisa verifikasi dulu
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return new Response(JSON.stringify({ message: 'Registrasi berhasil, tunggu verifikasi admin' }), { status: 200 })
  } catch (error) {
    console.error('Error registrasi:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan server' }), { status: 500 })
  }
}
