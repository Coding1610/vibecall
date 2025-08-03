import React from 'react'
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'
import Tilt from 'react-parallax-tilt';

type PropsType = {
    title:string;
    description:string;
    Icon : LucideIcon;
    className:string;
    handleClick:()=>void;
}

export default function Card({className,handleClick,title,description,Icon}:PropsType) {
  return (
    <>
    <Tilt scale={1.1}>
    <div className={cn('bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[320px] min-h-[290px] rounded-[20px] cursor-pointer',className)}
        onClick={handleClick}>
        <div className='flex justify-center items-center glassmorphism size-12 rounded-[10px]'>
            <Icon size={28}/>
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg font-normal'>{description}</p>
        </div>
    </div>
    </Tilt>
    </>
  )
}