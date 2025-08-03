"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation"; // ✅ Import useParams

export default function Meeting() {
  
  const { id } = useParams() as { id: string }; // ✅ Get ID from useParams

  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading || !user) return <Loader />;

  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}