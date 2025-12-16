import { NextResponse } from 'next/server'
import { calculateAverageRatingForBeers } from '@/data/average-rating'

export const GET = async (req: Request) => {
  try {
    await calculateAverageRatingForBeers()
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
