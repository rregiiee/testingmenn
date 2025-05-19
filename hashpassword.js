import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashed);
}

hashPassword('pimpinan');
