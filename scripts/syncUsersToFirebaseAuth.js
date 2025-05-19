import fs from 'fs'
import path from 'path'
import admin from 'firebase-admin'

const serviceAccountPath = path.resolve(process.cwd(), 'uasproject-44412-firebase-adminsdk-fbsvc-2a899b33c1.json')
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const users = [
  {
    email: 'pimpinan@gmail.com',
    password: 'pimpinan1',
    username: 'pimpinan1',
    role: 'pimpinan',
    status: 'active',
    nama: 'Pimpinan',
    nohp: '+6289534045664',
  },
]

async function syncUsers() {
  for (const user of users) {
    try {
      const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.nama,
        phoneNumber: user.nohp.startsWith('+') ? user.nohp : '+62' + user.nohp.replace(/^0/, ''),
        emailVerified: true,
      })

      console.log(`User ${user.email} berhasil dibuat dengan uid: ${userRecord.uid}`)

      await db.collection('users').doc(userRecord.uid).set({
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        nama: user.nama,
        nohp: user.nohp,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      console.log(`Data user ${user.email} tersimpan di Firestore.`)
    } catch (error) {
      console.error(`Gagal membuat user ${user.email}:`, error.message)
    }
  }
}

syncUsers()
