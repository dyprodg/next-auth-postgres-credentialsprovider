'use client'
import { useRouter } from "next/navigation"



const RegisterButton = () => {

const router = useRouter();

    const handleRegisterButton = () => {
        router.push('/register')
    }

    return (
        <div className="flex justify-between">

            <div className="m-4">
                <button 
                onClick={handleRegisterButton}
                className="button-28">
                    Create Account
                </button>
            </div>
        </div>
    )
}

export default RegisterButton