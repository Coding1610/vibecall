import React from 'react'
import StreamVideoProvider from '@/Providers/StreamClientProvider'

export default function RootLayout( {children} : {children:React.ReactNode} ){
  return (
    <>
        <main>
          <StreamVideoProvider>
            {children}
          </StreamVideoProvider>
        </main>
    </>

  )
}