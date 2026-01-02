export const AUTH_COOKIE_NAME = 'auth_token'
export const LOGIN_ROUTE = '/login'
export const DEFAULT_REDIRECT = '/'

// Routes that require authentication
// Note: Middleware matcher also needs to be updated if this changes significantly
// but this constant can be used for runtime checks if needed.
export const PROTECTED_ROUTES_PREFIXES = ['/admin', '/generate']
