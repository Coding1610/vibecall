'use client';

import Loader from './Loader';
import { toast } from 'sonner';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { StepBack,StepForward,Video,Play,ChevronRight } from 'lucide-react';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {

    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
        case 'ended':
            return endedCalls;
        case 'recordings':
            return recordings;
        case 'upcoming':
            return upcomingCalls;
        default:
            return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
        case 'ended':
            return 'No Previous Calls';
        case 'upcoming':
            return 'No Upcoming Calls';
        case 'recordings':
            return 'No Recordings';
        default:
            return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            
            try{

                const callData = await Promise.all(
                    callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
                );
    
                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);
    
                setRecordings(recordings);

            } catch(error){
                console.log(error);
                toast("Try again later");
            }

            };

            if (type === 'recordings') {
                fetchRecordings();
            }
    }, [type, callRecordings]);

    if (isLoading) return <Loader />;

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className="grid grid-col-1 gap-5 xl:grid-cols-3">
        {calls && calls.length > 0 ? (
            calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
                key={(meeting as Call).id}
                Icon={
                type === 'ended'
                    ? StepBack
                    : type === 'upcoming'
                    ? StepForward
                    : Video
                }
                title={
                    (meeting as Call).state?.custom?.description ||
                    (meeting as CallRecording).filename?.substring(0, 20) ||
                    'Personal Meeting'
                }
                date={
                    (meeting as Call).state?.startsAt?.toLocaleString() ||
                    (meeting as CallRecording).start_time?.toLocaleString()
                }
                isPreviousMeeting={type === 'ended'}
                link={
                type === 'recordings'
                    ? (meeting as CallRecording).url
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                }
                ButtonIcon1 = {type === 'recordings' ? Play : ChevronRight}
                buttonText={type === 'recordings' ? 'Play' : 'Start'}
                handleClick={
                type === 'recordings'
                    ? () => router.push(`${(meeting as CallRecording).url}`)
                    : () => router.push(`/meeting/${(meeting as Call).id}`)
                }
            />
            ))
        ) : (
            <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
        )}
        </div>
    );
    };

    export default CallList;