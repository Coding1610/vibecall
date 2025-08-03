"use client"
import React from 'react'
import Link from 'next/link';
import { sidebarLinks } from '@/Constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

export default function Sidebar() {

  const pathName = usePathname(); 

  return (
    <>
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-6'>
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
              return(
                <Link
                  href={link.route} 
                  key={link.label}
                  className={cn('flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1/30',{
                    'bg-blue-1': isActive,})}
                  >
                    <Icon size={24}/>
                    <p className='text-lg font-semibold max-lg:hidden'>
                      {link.label}
                    </p>

                </Link>
              )
            })}
        </div>
    </section>
    </>
  )
}