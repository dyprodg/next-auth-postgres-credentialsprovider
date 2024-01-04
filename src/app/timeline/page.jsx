'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LogoutButton from "../components/LogoutButton";

const Timeline = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        // Wenn keine Session vorhanden ist, umleiten zur Startseite
        if (!session) {
            router.push('/');
        }
    }, [session, router]);
    if (!session) {
        return null; // Keine visuelle Ausgabe, während auf die Umleitung gewartet wird
    } else { 
        console.log(session)
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
