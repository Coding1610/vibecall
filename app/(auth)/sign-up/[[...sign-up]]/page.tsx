import React from 'react'
import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Vibe Call | Signup ",
};

export default function SignUpPage() {
  return (
    <>
    <main className='flex justify-center items-center w-full h-screen'>
        <SignUp/>
    </main>
    </>
  )
}
