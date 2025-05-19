import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { join } from 'path'

if (!admin.apps.length) {
  // Pastikan file JSON ada di folder /config
  const serviceAccountPath = join(process.cwd(), 'config', 'uasproject-44412-firebase-adminsdk-fbsvc-2a899b33c1.json')
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const authAdmin = admin.auth()
export const dbAdmin   = admin.firestore()
