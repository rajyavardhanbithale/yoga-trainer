import { NextRequest, NextResponse } from 'next/server'
import { poseInfo } from './poseApiData'

export async function GET(req: NextRequest) {
    const poseData = poseInfo

    // minimal response to pose info using poseID param
    const poseID = req.nextUrl.searchParams.get('poseID') ?? null
    const poseList = req.nextUrl.searchParams.get('list') ?? null

    const poseIDList =
        (poseID ? poseID.split(',').map((item) => parseInt(item)) : []) ?? []
    const poseDataList: any[] | undefined = []
    poseIDList.forEach((poseID) => {
        const data = poseData.find((item) => item?.id === poseID)
        if (data) {
            poseDataList.push({
                id: data.id,
                name: data.name,
                originalName: data.originalName,
                image: data.image,
            })
        }
    })

    if (poseID) {
        return NextResponse.json(
            {
                poseDataList,
            },
            {
                status: 200,
            }
        )
    }

    if (poseList) {
        const poseDataList = poseData.map((item) => ({ id: item.id, name: item.name, originalName: item.originalName, image: item.image }))
        return NextResponse.json(poseDataList, { status: 200, })
    }

    return NextResponse.json(
        {
            poseData,
        },
        {
            status: 200,
        }
    )
}
