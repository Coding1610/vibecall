import { LucideIcon } from "lucide-react";
import { Home, Calendar, History, Video, User } from "lucide-react";

interface SidebarLinks {
    label:string,
    route:string,
    icon:LucideIcon,
}

export const sidebarLinks:SidebarLinks[] = [
    {
        label: "Home",
        route: "/",
        icon: Home ,
    },
    {
        label: "Upcoming",
        route: "/upcoming",
        icon: Calendar,
    },
    {
        label: "Previous",
        route: "/previous",
        icon: History,
    },
    {
        label: "Recordings",
        route: "/recordings",
        icon: Video,
    },
    {
        label: "Personal Room",
        route: "/personal-room",
        icon: User,
    },
];
