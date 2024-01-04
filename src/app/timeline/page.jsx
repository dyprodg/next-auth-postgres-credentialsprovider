'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LogoutButton from "../components/LogoutButton";

const Timeline = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);
    if (!session) {
        return null; 
    }

    return (
        <div className="flex w-full h-screen">
            <div className="flex w-full justify-end">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Timeline;
