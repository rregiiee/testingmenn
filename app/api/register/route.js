import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const dataFilePath = path.join(process.cwd(), 'public', 'alumni.json');

export async function POST(request) {
  try {
    const { nama, username, password, noHp, email } = await request.json();

    // Validasi lengkap
    if (!nama || !username || !password || !noHp || !email) {
      return new Response(JSON.stringify({ message: 'Lengkapi semua field' }), { status: 400 });
    }

    // Baca data alumni lama (kalau ada)
    let data = [];
    try {
      const file = await readFile(dataFilePath, 'utf-8');
      data = JSON.parse(file);
    } catch (err) {
      // File belum ada, bikin baru
      console.log('File data belum ada, membuat file baru.');
    }

    // Cek email atau username sudah ada
    const emailExists = data.find(user => user.email === email);
    const usernameExists = data.find(user => user.username === username);

    if (emailExists) {
      return new Response(JSON.stringify({ message: 'Email sudah terdaftar' }), { status: 409 });
    }
    if (usernameExists) {
      return new Response(JSON.stringify({ message: 'Username sudah digunakan' }), { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tambah alumni baru status pending
    const newAlumni = {
      id: Date.now().toString(),
      nama,
      username,
      password: hashedPassword,
      noHp,
      email,
      role: 'alumni',
      status: 'pending',
    };

    data.push(newAlumni);

    // Simpan data baru ke file
    await writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Pendaftaran berhasil, tunggu verifikasi admin.' }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan server' }), { status: 500 });
  }
}
