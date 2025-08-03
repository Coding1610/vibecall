"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'

export default function EndCallButton(){

    const call = useCall();
    const router = useRouter();

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingQwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if( !isMeetingQwner ) return null;

    else{
        return (
            <>
            <Button onClick={async () => {await call.endCall(); router.push('/');}} className='bg-red-500 font-bold hover:bg-red-600 text-center'>
                Close Meeting for Everyone
            </Button>
            </>
        )
    }
}