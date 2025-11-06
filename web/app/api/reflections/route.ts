import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const filePath = path.join(process.cwd(), 'data', 'reflections.json');

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

export async function GET() {
  await ensureFile();
  const raw = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(raw);
  return NextResponse.json({ items: data });
}

export async function POST(req: Request) {
  await ensureFile();
  const body = await req.json().catch(() => ({} as any));
  const now = new Date().toISOString();
  const item = {
    id: randomUUID(),
    createdAt: now,
    entryText: body.entryText || '',
    summary: body.summary || '',
    advice: body.advice || '',
    tags: body.tags || '',
  };

  const raw = await fs.readFile(filePath, 'utf8');
  const arr = JSON.parse(raw);
  arr.unshift(item);
  await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8');

  return NextResponse.json({ ok: true, item });
}
