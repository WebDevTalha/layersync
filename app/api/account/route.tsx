import connectMongoDB from "@/libs/mongodb"
import Account from "@/models/account"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const {
        account,
        isFromRefaer,
        isFromReferCode,
        ownReferCode,
        txnHistory,
        points,
    } = await request.json()
    await connectMongoDB()
    await Account.create({
        account,
        isFromRefaer,
        isFromReferCode,
        ownReferCode,
        txnHistory,
        points,
    })
    return NextResponse.json({ message: "Account Created" }, { status: 201 })
}
