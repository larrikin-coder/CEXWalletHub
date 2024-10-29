import { ProfileCard } from "../components/ProfileCard";
import db from "@/db"; 
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers";



async function getUserWallet(){
    const headersList = await headers();
    const cookiesList = await cookies();
    const session = await getServerSession(authConfig); 
    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select:{
            publicKey: true
        }
    })

    if(!userWallet){
        return {
            error: "No Solana wallet found associated with the user"
        }
    }
    return {error:null,userWallet};
}


export default async function(){
    const headersList = await headers();
    const cookiesList = await cookies();
    const userWallet = await getUserWallet()
    if (userWallet.error || !userWallet.userWallet?.publicKey){
        return <>No Solana wallet found</>
    }
    return <div>
        <ProfileCard publicKey={userWallet.userWallet?.publicKey}/>
    </div>
}