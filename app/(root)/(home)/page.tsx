"use client"

import React from 'react'
import Link from 'next/link';
import Shiny from '@/components/Shiny'
import MeetingTypeList from '@/components/MeetingTypeList';

export default function Home() {

  const now = new Date();

  const time = now.toLocaleTimeString('en-IR', {hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-IR', {dateStyle:'full'})).format(now);

  return (
    <>  
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11'>
          <div className='flex flex-col gap-2 justify-end h-full'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
      <div className='flex justify-center items-center gap-1.5'>
        <p className="text-[20px] font-light text-center">
          Made with love by
        </p>
        <Link href="https://www.linkedin.com/in/yash-prajapati-512451298" rel="noopener noreferre" target='_blank' className='cursor-pointer'>
          <Shiny text= "this guy" speed={3} className='text-[20px] self-center'/>
        </Link>
      </div>
    </section>
    </>
  )
}