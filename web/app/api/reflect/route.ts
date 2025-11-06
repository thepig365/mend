import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/reflect' });
}

export async function POST(req: Request) {
  try {
    const { entryText } = await req.json();

    if (!entryText || entryText.trim().length < 5) {
      return NextResponse.json({ error: 'Please write a bit more detail.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        summary: `I hear you. You wrote: “${entryText.slice(0, 80)}”`,
        advice: 'Take one conscious deep breath.',
        tags: 'calm, compassion, reflection',
        note: 'Stubbed (no OPENAI_API_KEY set).'
      });
    }

    const client = new OpenAI({ apiKey });

    const prompt = `You are a gentle mentor helping someone self-reflect and reconcile their emotions.
Read the following journal entry and reply with:
1. A short empathetic summary (1–2 sentences).
2. A gentle reflection or suggestion.
3. Three emotional keywords.

Journal:
"""${entryText}"""`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    const [summary, advice, tags] = content.split(/\n+/);

    return NextResponse.json({
      summary: summary?.replace(/^1\.\s*/, '') || 'I hear you. Thank you for sharing.',
      advice: advice?.replace(/^2\.\s*/, '') || 'Be kind to yourself today.',
      tags: tags?.replace(/^3\.\s*/, '') || 'calm, compassion, reflection',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
