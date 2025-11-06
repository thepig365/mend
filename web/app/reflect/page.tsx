'use client';
import { useState } from 'react';

export default function ReflectPage() {
  const [text, setText] = useState('');
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setResp(null); setSaved(false);
    if (!text.trim()) return;
    setLoading(true);
    try {
      // 1) Ask AI for reflection
      const r = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryText: text }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'AI request failed');
      setResp(data);

      // 2) Save to Library
      const s = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entryText: text,
          summary: data.summary,
          advice: data.advice,
          tags: data.tags,
        }),
      });
      if (!s.ok) throw new Error('Save failed');
      setSaved(true);
    } catch (e: any) {
      setErr(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Reflect</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write whatever you feel right now…"
          style={{ height: 140, padding: 12, borderRadius: 8, border: '1px solid #cbd5e1' }}
        />
        <button
          disabled={loading}
          style={{
            background: '#0f766e',
            color: 'white',
            padding: '10px 14px',
            borderRadius: 8,
            border: 'none',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Listening…' : 'Send Reflection'}
        </button>
      </form>

      {err && <p style={{ color: '#b91c1c', marginTop: 12 }}>{err}</p>}
      {resp && (
        <div style={{ marginTop: 16, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <div><strong>Reflection:</strong> {resp.summary}</div>
          <div><strong>Gentle Insight:</strong> {resp.advice}</div>
          <div style={{ color: '#475569' }}><strong>Emotional Notes:</strong> {resp.tags}</div>
          {saved && <div style={{ color: '#16a34a', marginTop: 8 }}>Saved to Library ✓</div>}
        </div>
      )}
    </main>
  );
}
