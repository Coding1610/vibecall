"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Shiny from '@/components/Shiny'
import { sidebarLinks } from '@/Constants'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
  
export default function MobileNav() {

    const pathName = usePathname();

    return (
        <>
        <section className='w-full max-w-[264px] hidden max-sm:block'>
            <Sheet>
                <SheetTrigger asChild>
                    <Menu size={28} className='cursor-pointer'/>
                </SheetTrigger>
                <SheetContent 
                    side="left"
                    className='border-none outline-none bg-dark-1'
                    >
                    <Link
                    href="/"
                    className='flex items-center gap-3 outline-none'>
                        <Image 
                            width={60}
                            height={60}
                            src="/icons/logo.svg"
                            alt="vibe call logo"
                            className='max-sm:size-10'
                        />
                        <Shiny text="Vibe Call" speed={3} className='flex item center text-[26px] font-extrabold'/>

                    </Link> 

                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-10 text-white'>
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathName === link.route;
                                return(
                                    <SheetClose asChild key={link.label}>
                                        <Link
                                        href={link.route} 
                                        key={link.label}
                                        className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:bg-blue-1/30',{
                                            'bg-blue-1': isActive,})}
                                        >
                                            <Icon size={24}/>
                                            <p className='text-lg font-semibold'>
                                            {link.label}
                                            </p>
                                        </Link>
                                    </SheetClose>
                                )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
        </>
    )
}   