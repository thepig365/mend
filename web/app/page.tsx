export default function Home() {
  return (
    <>
      <h1 style={{ margin: '12px 0 8px', fontSize: 28 }}>Welcome to Mend</h1>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        A gentle space for self-reflection and emotional healing. Start by writing in <strong>Reflect</strong>, then review your notes in <strong>Library</strong>.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        <li style={{ background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h3>Reflect</h3>
          <p style={{ margin: 0, color: '#475569' }}>Write what you feel and receive a gentle reflection.</p>
          <a href="/reflect">Go to Reflect →</a>
        </li>
        <li style={{ background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h3>Library</h3>
          <p style={{ margin: 0, color: '#475569' }}>Browse your saved reflections over time.</p>
          <a href="/library">Go to Library →</a>
        </li>
      </ul>
    </>
  );
}
