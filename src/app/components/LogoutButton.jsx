'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogoutButton = async () => {
        await signOut({ redirect: false });
        router.push('/');
    }

    return (
        <div className="flex justify-between">
            <div className="m-4">
                <button 
                    onClick={handleLogoutButton}
                    className="button-28">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default LogoutButton;
