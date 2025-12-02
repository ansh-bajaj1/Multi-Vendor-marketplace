import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });

    return NextResponse.json({ success: true, data: { user: safeUser, accessToken: token } });
  } catch (err: any) {
    console.error('Login handler error:', err.message || err);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
