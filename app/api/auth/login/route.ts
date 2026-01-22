import { NextResponse } from 'next/server'
import { validateCredentials, getSessionCookieOptions } from '../../../../lib/auth/session'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    const user = await validateCredentials(username, password)

    if (user) {
      const response = NextResponse.json(
        { message: 'Authentication successful', user },
        { status: 200 }
      )

      const { name, value, options } = getSessionCookieOptions()
      response.cookies.set(name, value, options)

      return response
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
