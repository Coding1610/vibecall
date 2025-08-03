import React from 'react'
import CallList from '@/components/CallList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Vibe Call | Upcoming Meetings ",
};

export default function Upcoming() {
  return (
    <>
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
      Upcoming
      </h1>
      <CallList type="upcoming"/>
    </section>
    </>
  )
}