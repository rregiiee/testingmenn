import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'alumni.json');

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ message: 'ID dan status diperlukan' }), { status: 400 });
    }

    const file = await readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(file);

    const idx = data.findIndex(user => user.id === id);
    if (idx === -1) {
      return new Response(JSON.stringify({ message: 'User tidak ditemukan' }), { status: 404 });
    }

    data[idx].status = status;

    await writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Status berhasil diperbarui' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Gagal memperbarui status' }), { status: 500 });
  }
}
