import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
    return NextResponse.json({ message: "pong" });
}