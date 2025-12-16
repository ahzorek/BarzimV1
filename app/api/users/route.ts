import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const GET = async () => {
  const data = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      bio: true,
      link: true,
      role: true,
      dateOfBirth: true,
      createdAt: true,
      isTwoFactorEnabled: true,
      isPrivate: true,
      genero: true,
      cep: true,
      emailVerified: true,
    },
  })

  if (!data) {
    return NextResponse.json({ err: 'user not found' }, { status: 418 })
  }
  return NextResponse.json(data)
}
