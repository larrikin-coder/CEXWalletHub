"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect } from "react";


export const ProfileCard = ({publicKey}:{publicKey: string}) =>{
    const session = useSession();
    const router = useRouter();
    
    if (session.status === "loading"){
        return <div>
            Loading...
        </div>
    }

    // if (session.data?.user){
    //     router.push("/")
    //     return null;
    // }
    useEffect(()=>{
        if (session.status!=="loading" && session.data?.user){
            router.push("/");
        }
    },[session.status,session.data,router])



    return <div className="pt-8  flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""}/>
            <Assets publicKey={publicKey}/>
        </div>
    </div>
}


function Assets({publicKey}:{publicKey: string}){
    return <div className="text-slate-500 mt-4">
        CEXWalletHub Account Assets
        <br />
        <div className="flex justify-between">
            <div>

            </div>
            <div>
                <PrimaryButton onClick={()=>{}}>Your Wallet Address</PrimaryButton>
            </div>
        </div>
    </div>
}

function Greeting({
    image,name
}:{image:string,name:string}){
    return <div className="flex">
        <img src={image} alt="NA" className="rounded-full w-14 h-14 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">Welcome back, {name}</div>
    </div>
}