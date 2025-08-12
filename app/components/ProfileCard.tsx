"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect, useState } from "react";

export const ProfileCard = ({publicKey}:{publicKey: string}) => {
    const session = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (session.status !== "loading" && !session.data?.user) {
            router.push("/");
        }
    }, [session.status, session.data, router]);

    // NOW handle conditional rendering
    if (session.status === "loading"){
        return <div>
            Loading...
        </div>
    }

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
    // const [showAddress, setShowAddress] = useState(false);
    const [copied,setCopied] = useState(false);
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(publicKey);
            // You might want to show a toast notification here
            setCopied(true);
            console.log('Address copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy address:', err);
        }
    };

    return <div className="text-slate-500 mt-4">
        <div className="text-lg font-medium mb-2">CEXWalletHub Account Assets</div>
        <div className="flex justify-between mt-4">
            {/* <div className="flex-1 mr-4">
                {showAddress && (
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all max-w-md">
                        {publicKey}
                    </div>
                )}
            </div> */}
            <div>
                Your Avl Balance
            </div>
            <div className="flex gap-2">
                {/* <PrimaryButton onClick={() => setShowAddress(!showAddress)}>
                    {showAddress ? 'Hide Address' : 'Show Wallet Address'}
                </PrimaryButton>
                {showAddress && (
                    <PrimaryButton onClick={copyToClipboard}>
                        Copy Address
                    </PrimaryButton>
                )} */
                }
               
                <PrimaryButton onClick={copyToClipboard}>{copied ? "Copied" : "Your Wallet Address"}</PrimaryButton>


            </div>
        </div>
    </div>
}

function Greeting({
    image, name
}: {image: string, name: string}) {
    return <div className="flex items-center">
        <img src={image} alt="Profile" className="rounded-full w-14 h-14 mr-4" />
        <div className="text-2xl font-semibold">
            Welcome back, {name}
        </div>
    </div>
}