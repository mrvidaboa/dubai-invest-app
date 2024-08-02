import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const filePath = path.join(process.cwd(), 'app/users.json');

export async function POST(req) {
  const { email, password } = await req.json();

  // Read existing users
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add new user
  users.push({ email, password: hashedPassword });

  // Write updated users back to file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: 'User registered successfully' });
}