import React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import EndCallButton from './EndCallButton';
import { LayoutList, Users} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

export default function MeetingRoom() {

    const router = useRouter();
    
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');

    const [layout,setLayout] = useState<CallLayoutType>('speaker-left');

    const [showParticipants, setShowParticipants] = useState(false);

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left"/>
            default:
                return <SpeakerLayout  participantsBarPosition="right"/>
            break;
        }
    }

    return (
        <>
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout/>
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'block':showParticipants})}>
                    <CallParticipantsList onClose={()=>{setShowParticipants(false)}}/>
                </div>
            </div>
            <div className='fixed pl-2 pr-2 sm:p-0 flex-wrap bottom-0 mb-5 flex w-full gap-5 justify-center items-center'>
                <CallControls onLeave={() => {router.push('/')}}/>
                <DropdownMenu>
                    <div className='flex item-center'>
                        <DropdownMenuTrigger className='cursor-pointer rounded-full px-2 py-2 hover:bg-[#4c535b] bg-[#19232d]'>
                            <LayoutList size={20}/>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                        {['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>(
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => {setLayout(item.toLowerCase() as CallLayoutType)}}>
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className='cursor-pointer rounded-full px-2 py-2 hover:bg-[#4c535b] bg-[#19232d]'> 
                        <Users size={20}/>
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
        </>
    )
}