import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Vibe Call | Signin ",
};

export default function SignInPage() {
  return (
    <>
    <main className='flex h-screen w-full items-center justify-center'>
        <SignIn/>
    </main>
    </>
  )
}