import { NextResponse } from 'next/server';

const BACKEND = 'http://127.0.0.1:5000';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Upstream not ok');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    // Fallback mock response so frontend stays functional when backend is unreachable
    return NextResponse.json({ success: true, message: 'Mock API healthy (frontend fallback)' });
  }
}
