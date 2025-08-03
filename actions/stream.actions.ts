"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const tokenProvider = async () => {

    const user = await currentUser();

    if(!user) throw new Error("User not found");
    if(!STREAM_API_KEY) throw new Error("Stream API Key not found");
    if(!STREAM_API_SECRET) throw new Error("Stream API Secret not found");

    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user.id, expirationTime, issuedAt);

    return token;
}