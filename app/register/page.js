'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    noHp: '',
    email: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setMessage('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.nama.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.noHp.trim() ||
      !formData.email.trim()
    ) {
      setError('Semua field wajib diisi')
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Terjadi kesalahan')
        return
      }

      setMessage(data.message)
      setFormData({
        nama: '',
        username: '',
        password: '',
        noHp: '',
        email: ''
      })
    } catch (err) {
      setError('Gagal terhubung ke server')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-blue-100 flex items-center justify-center py-12">
        <img src="/logoo.png" alt="Logo" className="max-w-xs md:max-w-sm h-auto" />
      </div>

      <div className="md:w-1/2 w-full bg-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-extrabold text-black mb-6 text-center">REGISTER FORM</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 text-center">{error}</p>}
            {message && <p className="text-green-600 text-center">{message}</p>}
            <div>
              <label className="block mb-1 text-sm text-black">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-black">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-black">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-black">No. WhatsApp</label>
              <input
                type="tel"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
