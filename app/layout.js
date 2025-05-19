// app/layout.js
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'My Next.js Firebase Auth App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
