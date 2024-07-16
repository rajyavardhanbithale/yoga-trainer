

import { createClient } from "@/utils/supabase/middleware-client";
import { NextRequest, NextResponse } from "next/server";
import { APIYogaPosePerformanceData } from "@/types";
import CryptoJS from 'crypto-js';

const poseAnalysis = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_POSE_ANALYSIS!

export async function POST(request: NextRequest) {
    const body: APIYogaPosePerformanceData = await request.json()

    const { supabase, response } = createClient(request);

    const obsfID = CryptoJS.MD5(body.userID).toString();

    const newBody: APIYogaPosePerformanceData = {...body, userID:obsfID}

    const { error } = await supabase    
        .from(poseAnalysis)
        .insert(newBody)


    if (error) {
        console.log(error);
        
        return NextResponse.json({
            message: "error in inserting data to database"
        }, {
            status: 500
        })
    }
    
    return NextResponse.json({
        message: "data inserted"
    }, {
        status: 200
    })
}
