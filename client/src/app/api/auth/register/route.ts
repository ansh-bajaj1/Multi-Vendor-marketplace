import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Check existing
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });

    return NextResponse.json({ success: true, data: { user: safeUser, accessToken: token } }, { status: 201 });
  } catch (err: any) {
    console.error('Register handler error:', err.message || err);
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
}
