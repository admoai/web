import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST (request) {
  const body = await request.json()
  const path = [body.slug]

  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
