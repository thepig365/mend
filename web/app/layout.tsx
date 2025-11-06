export const metadata = {
  title: 'Mend',
  description: 'Self-reflection and emotional healing platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          fontFamily: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
          background: '#faf7f0',
          margin: 0,
        }}
      >
        <header
          style={{
            padding: '14px 20px',
            background: '#0f766e',
            color: 'white',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div style={{ fontWeight: 700 }}>Mend</div>
          <nav style={{ display: 'flex', gap: 12 }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/reflect" style={{ color: 'white', textDecoration: 'none' }}>Reflect</a>
            <a href="/library" style={{ color: 'white', textDecoration: 'none' }}>Library</a>
            <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          </nav>
        </header>
        <main style={{ padding: 24, maxWidth: 840, margin: '0 auto' }}>
          {children}
        </main>
        <footer style={{ padding: 20, textAlign: 'center', color: '#475569' }}>
          © {new Date().getFullYear()} Mend
        </footer>
      </body>
    </html>
  );
}
