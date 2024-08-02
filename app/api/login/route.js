import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const filePath = path.join(process.cwd(), 'app/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  const { email, password } = await req.json();

  // Read existing users
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Find user
  const user = users.find(user => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Create token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token });
}