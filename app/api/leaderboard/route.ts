import { UserMetrics } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    const supabase = createClient()

    const { data } = await supabase
        .from("pose-performance-data")
        .select("userID,accuracy,correctPose,startTime,endTime,repTime,duration")

    if (data) {
        const mean = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

        const standardDeviation = (arr: number[]): number => {
            const avg = mean(arr);
            return Math.sqrt(arr.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / arr.length);
        };

        const userData: Record<string, UserMetrics> = {};

        data.forEach(entry => {
            const userId = entry.userID;
            if (!userData[userId]) {
                userData[userId] = {
                    correctPose: [],
                    repTime: [],
                    totalReps: 0,
                    duration: []
                };
            }
            userData[userId].correctPose.push(...entry.correctPose.map(pose => pose === 1 ? 1 : 0)); // Ensure binary values
            userData[userId].repTime.push(...Array(entry.correctPose.length).fill(entry.repTime));
            userData[userId].totalReps += 1;
            userData[userId].duration.push(entry.duration);
        });

        const userMetrics: Record<string, {
            id: string; // Adding the id property here
            correctPoseMean: number;
            correctPoseStdDev: number;
            repTimeMean: number;
            repTimeStdDev: number;
            durationMean: number;
            durationStdDev: number;
        }> = {};

        const userMetricsArray = Object.keys(userData).map(userId => {
            const metrics = userData[userId];
            
            return {
                id: userId,
                correctPoseMean: mean(metrics.correctPose),
                correctPoseStdDev: standardDeviation(metrics.correctPose),
                repTimeMean: mean(metrics.repTime),
                repTimeStdDev: standardDeviation(metrics.repTime),
                durationMean: mean(metrics.duration),
                durationStdDev: standardDeviation(metrics.duration),
            };
        });

        return NextResponse.json(userMetricsArray); 
    } else {
        return NextResponse.json({ message: "No data found" }, { status: 404 });
    }


} 