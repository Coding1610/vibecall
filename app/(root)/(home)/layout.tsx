import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function HomeLayout(
    {children}:{children:React.ReactNode}
) {
  return (
    <>
        <main className='relative text-white'>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 sm:pt-32 pt-24 max-md:pb-14 sm:px-8'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    </>

  )
}
