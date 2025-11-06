'use client';
import { useEffect, useState } from 'react';

type Item = {
  id: string;
  createdAt: string;
  entryText: string;
  summary: string;
  advice: string;
  tags: string;
};

export default function LibraryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/reflections', { cache: 'no-store' });
        const data = await r.json();
        if (!r.ok) throw new Error(data?.error || 'Failed to load');
        setItems(data.items || []);
      } catch (e: any) {
        setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 840, margin: '0 auto' }}>
      <h1>My Reflections</h1>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: '#b91c1c' }}>{err}</p>}
      {!loading && !err && items.length === 0 && (
        <p style={{ color: '#475569' }}>No reflections yet — write one under <a href="/reflect">Reflect</a>.</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {items.map((it) => (
          <li key={it.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>{new Date(it.createdAt).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}><strong>Reflection:</strong> {it.summary}</div>
            <div><strong>Insight:</strong> {it.advice}</div>
            <div style={{ color: '#475569' }}><strong>Tags:</strong> {it.tags}</div>
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0f766e' }}>Original note</summary>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{it.entryText}</pre>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
