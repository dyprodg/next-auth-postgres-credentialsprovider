'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    }

    return (
        <div>Timeline</div>
    );
};

export default Timeline;
