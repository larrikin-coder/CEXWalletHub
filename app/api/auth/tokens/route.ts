import { NextRequest } from "next/server";

export function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const searchQuery = searchParams.get("/address");
    // ata => associated token account
    // pda => program derived address
    
}

