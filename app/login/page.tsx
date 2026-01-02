'use client'

import { useSearchParams } from 'next/navigation'
import { LoginForm } from '../../components/auth/LoginForm'
import { Suspense } from 'react'

function LoginPageContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
