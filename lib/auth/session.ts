import { AUTH_COOKIE_NAME } from './constants'

// Mock User Interface
export interface User {
  id: string
  username: string
  role: 'admin' | 'user'
}

/**
 * Validates a user's credentials.
 * This is a server-side only function.
 */
export async function validateCredentials(username: string, password: string): Promise<User | null> {
  // In a real app, verify against DB
  if (username === 'admin' && password === 'password') {
    return {
      id: '1',
      username: 'admin',
      role: 'admin',
    }
  }
  return null
}

/**
 * Creates the cookie options for the session.
 */
export function getSessionCookieOptions() {
  const oneDay = 24 * 60 * 60 * 1000
  return {
    name: AUTH_COOKIE_NAME,
    value: 'secure-token-123', // In real app, generate a JWT or session ID
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: oneDay,
      path: '/',
    },
  }
}

/**
 * Verifies if a token is valid.
 */
export function verifyToken(token: string | undefined): boolean {
  // In a real app, verify JWT signature or DB session
  return token === 'secure-token-123'
}
