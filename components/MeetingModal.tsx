import React from 'react'
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogTitle,
    DialogContent,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';

import { LucideIcon } from 'lucide-react';
  
type ModalType = {
    title:string;
    isOpen:boolean;
    className?:string;
    handleClick?:()=>void;
    buttonText?:string;
    onClose:()=>void;
    children?:React.ReactNode;
    Image?:LucideIcon;
    ButtonIcon?:LucideIcon;
}

export default function MeetingModal({ButtonIcon,children,Image,title,isOpen,onClose,className,handleClick,buttonText}:ModalType){
  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='flex w-full max-w-[350px] flex-col gap-6 border-none outline-none bg-dark-1 px-6 py-9 text-white'>
            <DialogTitle>Vibe Call</DialogTitle>
           <div className='flex flex-col gap-6'>
                {
                    Image && (
                        <div className='flex justify-center'>
                            <Image size={52} color='#0E78F9' />
                        </div>
                    )
                }
                <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
                {children}
                <Button className='flex justify-center items-center bg-blue-1 hover:bg-blue-700 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                    {ButtonIcon && ( 
                        <ButtonIcon />
                    )} &nbsp;
                    {buttonText || "Schedule Meeting"}
                </Button>
           </div>
        </DialogContent>
        </Dialog>
    </>
  )
}