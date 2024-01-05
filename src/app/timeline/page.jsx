'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoutButton from "../components/LogoutButton";
import { getActiveUser } from "@/lib/GetActiveUser";

const Timeline = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [userDetails, setUserDetails] = useState(null)
    

    console.log(session)

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);
    if (!session) {
        return null; 
    }

    return (
        <div className="flex w-full h-screen flex-col">
            <div className="flex w-full justify-end"> 
                <LogoutButton />
            </div>
            <div className="flex flex-col items-center justify-center flex-grow"> 
                <p>Username: {session.user.username}</p> 
                <p>User ID: {session.user.id}</p>
                <p>Email: {session.user.email}</p>
            </div>
        </div>
    );
    
};

export default Timeline;
