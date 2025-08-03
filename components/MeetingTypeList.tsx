"use client"
import React from 'react'
import Card from './Card'
import { toast } from "sonner"
import { useState } from 'react'
import { Input } from './ui/input'
import { useUser } from '@clerk/nextjs'
import { Textarea } from './ui/textarea'
import DatePicker from 'react-datepicker'
import MeetingModal from './MeetingModal'
import {useRouter} from 'next/navigation'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Copy, TvMinimal, CalendarCheck, ShieldCheck } from 'lucide-react'
import {Video, PlusCircle, UserPlus, CalendarSync, Merge} from 'lucide-react'

const initialValue = {
    dateTime: new Date(),
    description:'',
    link:'',
}

export default function MeetingTypeList() {

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<'isInstantMeeting'|'isJoinMeeting'|'isScheduleMeeting'|undefined>()

    const [value, setValue] = useState(initialValue);
    const [callDetail, setCallDeatil] = useState<Call>();

    const {user} = useUser(); 
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        
        if( !client || !user ) return;

        try{
            if( !value.dateTime ){
                toast("Please select a date and time");
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default',id);
            if(!call){
                throw new Error('Failed to craete create meeting');
                toast("Failed to craete create meeting");
            }
            const startsAt = value.dateTime.toISOString() || new Date( Date.now()).toISOString();
            const description = value.description || 'Instant Meeting';
            
            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description,
                    },
                },
            });

            setCallDeatil(call);

            if(!value.description){
                router.push(`/meeting/${call.id}`);
            }

            toast("Meeting Created Successfully");

        } catch(error){
            console.log(error);
            toast("Failed to create meeting");
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${callDetail?.id}`;

    return (
        <>
        <section className='grid grid-cols-1 xl:gap-6 gap-8 md:grid-cols-2 xl:grid-cols-4'>
            <Card 
                Icon={PlusCircle}
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <Card
                Icon={UserPlus}
                title="Join Meeting"
                description="Via invitation link"
                handleClick={() => setMeetingState('isJoinMeeting')}
                className='bg-blue-1'
            />
            <Card
                Icon={CalendarSync}
                title="Schedule Meeting"
                description="Plan your next meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-purple-1'
            />
            <Card
                Icon={Video}
                title="Video Recordings"
                description="Check out your recordings"
                handleClick={ () => router.push('/recordings') }
                className='bg-yellow-1'
            />

            {!callDetail ? (
                <MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Schedule your next Meeting"
                handleClick={createMeeting}
                ButtonIcon={CalendarCheck}
                className='text-center'
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                        Add a description
                        </label>
                        <Textarea
                        className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(e) =>
                            setValue({ ...value, description: e.target.value })
                        }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                        Select Date and Time
                        </label>
                        <DatePicker
                            selected={value.dateTime}
                            onChange={(date) => setValue({ ...value, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ):(
                <MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Meeting Created"
                className="text-center"
                handleClick={() => {
                     navigator.clipboard.writeText(meetingLink);
                     toast("Link Copied")
                }}
                Image={ShieldCheck}
                ButtonIcon={Copy}
                buttonText='Copy Meeting Link'
            /> 
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                ButtonIcon={TvMinimal}
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoinMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                ButtonIcon={Merge}
                handleClick={() => router.push(value.link)}
            >
                <Input placeholder="enter meeting link" onChange={(e) => setValue({...value, link:e.target.value})}/>
            </MeetingModal>
        </section>
        </>
    )
}