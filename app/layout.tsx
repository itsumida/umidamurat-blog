import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: "mida",
  description: "Personal blog by Umida Murat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ padding: '0 1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              <Link href="/" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>
                umida murat
              </Link>
            </h1>
            <nav style={{ fontSize: '1rem' }}>
              <Link href="/about" style={{ color: 'var(--link)' }}>about</Link>
              <span style={{ margin: '0 0.5rem', color: 'var(--foreground)' }}>│</span>
              <Link href="/tags" style={{ color: 'var(--link)' }}>tags</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.875rem', opacity: 0.7 }}>
            <p>© {new Date().getFullYear()} umida murat</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
