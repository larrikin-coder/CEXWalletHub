"use client";
import { useSession } from "next-auth/react"

export default function(){
    const session = useSession();
    return <div className="pt-8  flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""}/>
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