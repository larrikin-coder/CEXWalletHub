"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect, useState } from "react";

export const ProfileCard = ({publicKey}:{publicKey: string}) => {
    const session = useSession();
    const router = useRouter();
    
    if (session.status === "loading"){
        return <div>
            Loading...
        </div>
    }

    useEffect(() => {
        if (session.status !== "loading" && !session.data?.user) {
            router.push("/");
        }
    }, [session.status, session.data, router])

    // Don't render if not authenticated
    if (!session.data?.user) {
        return null;
    }
    
    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""}/>
            <Assets publicKey={publicKey}/>
        </div>
    </div>
}

function Assets({publicKey}:{publicKey: string}) {
    const [showAddress, setShowAddress] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicKey);
        // You might want to show a toast notification here
    };

    return <div className="text-slate-500 mt-4">
        CEXWalletHub Account Assets
        <br />
        <div className="flex justify-between mt-4">
            <div>
                {showAddress && (
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
                        {publicKey}
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <PrimaryButton onClick={() => setShowAddress(!showAddress)}>
                    {showAddress ? 'Hide Address' : 'Show Wallet Address'}
                </PrimaryButton>
                {showAddress && (
                    <PrimaryButton onClick={copyToClipboard}>
                        Copy Address
                    </PrimaryButton>
                )}
            </div>
        </div>
    </div>
}

function Greeting({
    image, name
}: {image: string, name: string}) {
    return <div className="flex">
        <img src={image} alt="Profile" className="rounded-full w-14 h-14 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">
            Welcome back, {name}
        </div>
    </div>
}