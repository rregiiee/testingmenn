import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'alumni.json');

export async function GET() {
  try {
    const file = await readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(file);
    const pendingUsers = data.filter(user => user.status === 'pending');
    return new Response(JSON.stringify(pendingUsers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Gagal mengambil data' }), { status: 500 });
  }
}
