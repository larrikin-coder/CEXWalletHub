"use client";
import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () =>{
    const session = useSession();
    const router = useRouter();
    return<div>
            <div className="text-4xl font-bold">
                Crypto Exchange an Indian 
             <span className="text-6xl font-bold text-sky-600 pl-2">Revolution</span>
            </div>
            <div className="flex justify-center pt-4 text-xl font-semibold">
                Hassle-free Crypto Exchange. Convert your INR into Cryptocurrency.
            </div>
            <div className="flex justify-center pt-4">
                {session.data?.user ? <SecondaryButton onClick={()=>{
                    router.push("/dashboard");
                }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={()=>{
                    signIn("google")
                }}>
                    Sign Up with Google
                </SecondaryButton>}                
            </div>
        </div>
    
}