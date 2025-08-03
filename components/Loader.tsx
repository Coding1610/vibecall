import React from 'react'
import Image from 'next/image'

export default function Loader() {
  return (
    <>
    <div className='flex justify-center items-center w-full h-screen'>
      <Image src="/icons/loading-circle.svg" alt="Loader" width={80} height={80} />
    </div>
    </>
  )
}