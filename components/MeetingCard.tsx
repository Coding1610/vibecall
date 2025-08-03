"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface MeetingCardProps {
    title: string;
    date: string;
    Icon: LucideIcon;
    isPreviousMeeting?: boolean;
    ButtonIcon1?: LucideIcon;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    Icon,
    title,
    date,
    isPreviousMeeting,
    ButtonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
 
    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <div className='flex justify-center items-center  size-12 bg-slate-500/30 rounded-[10px]'>
                    <Icon size={32}/>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal text-gray-400">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                {!isPreviousMeeting && (
                <div className="flex gap-2">
                    <Button onClick={handleClick} className="rounded bg-blue-1 hover:bg-blue-700 px-6 flex justify-center items-center">
                        {ButtonIcon1 && (
                            <ButtonIcon1 size={28} />
                        )}
                        {buttonText}
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(link);
                            toast("Link Copied");
                        }}
                        className="bg-dark-3 hover:bg-dark-4 px-6"
                        >
                        <Copy size={28}/>
                        &nbsp; Copy Link
                    </Button>
                </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;