import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { readFile } from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const dataFilePath = path.join(process.cwd(), "public", "alumni.json"); // pastikan ini ke alumni.json

const fixedUsers = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "humas", password: "humas", role: "humas" },
  { username: "dosen", password: "dosen", role: "dosen" },
  { username: "pimpinan", password: "pimpinan", role: "pimpinan" },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  if (!credentials.username || !credentials.password) {
    throw new Error("Lengkapi username dan password");
  }

  // Cek fixedUsers
  const fixedUser = fixedUsers.find(
    (u) =>
      u.username === credentials.username &&
      u.password === credentials.password
  );
  if (fixedUser) {
    return { id: fixedUser.username, name: fixedUser.username, role: fixedUser.role };
  }

  try {
    const file = await readFile(path.join(process.cwd(), "public", "alumni.json"), "utf8");
    const users = JSON.parse(file);

    const user = users.find((u) => u.username === credentials.username);

    if (!user) throw new Error("Username atau password salah");

    if (user.status !== "active") throw new Error("Akun Anda belum diverifikasi");

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) throw new Error("Username atau password salah");

    return {
      id: user.id || null,
      name: user.nama,
      role: user.role || "alumni"
    };
  } catch (err) {
    throw new Error(err.message || "Terjadi kesalahan");
  }
}

      
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
