"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import { PrimaryButton } from "./Button";

export const Appbar = () =>{
    const session = useSession();
    return(
        <div className="border-b px-2 py-2 flex justify-between">
            <div className="text-xl font-bold flex flex-col justify-center">
                CEXWalletHub
            </div>
            <div>

            {session.data?.user ? <PrimaryButton onClick={()=>{
                signOut()
                }}>
                    {session.data?.user &&(
                <div className="flex items-center gap-3">
                <img src={session.data.user.image || ""} alt="Profile" className="w-8 h-8 rounded-full"></img>
                Log Out
                </div>
            )}
                </PrimaryButton> : <PrimaryButton onClick={()=>{
                    signIn()
                    }}>Sign In</PrimaryButton>}
            </div>
        </div>
    )
}