"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Shiny from '@/components/Shiny'
import MobileNav from './MobileNav'
import { Maximize } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useFullscreen } from 'react-haiku';
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar() {

    const documentRef = useRef<HTMLElement | null>(null); 

    useEffect(() => {
        documentRef.current = document.documentElement;
    }, []);

    const {isFullscreen, toggleFullscreen } = useFullscreen(documentRef);
    console.log(isFullscreen);

    return (
        <>
        <nav className='flex justify-between item-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            
            <Link
            href="/"
            className='flex item-center gap-3 outline-none'>
                <Image 
                    width={60}
                    height={60}
                    src="/icons/logo.svg"
                    alt="vibe call logo"
                    className='max-sm:size-10'
                />
                <Shiny text="Vibe Call" speed={3} className='text-[26px] font-extrabold max-sm:hidden self-center'/>
            </Link>

            <div className='flex justify-center items-center gap-5'>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <Maximize onClick={toggleFullscreen} className='md:w-10 md:h-10 w-20 cursor-pointer px-2'/>
                <MobileNav/>
            </div>

        </nav>
        </>
    )
}