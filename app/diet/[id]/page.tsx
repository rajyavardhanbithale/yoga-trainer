import { MealData, mealData } from '@/app/api/diet/mealData'
import React from 'react'
import RecipePage from '@/app/components/Diet/RecipePage'
import NotFound from '@/app/components/not-found'

async function fetchDiet(id: string) {
    const param = id

    const paramDecoded = decodeURIComponent(param)
    const paramTransformed: string[] = paramDecoded.split('-')

    const dietID: number = parseInt(
        paramTransformed[paramTransformed.length - 1]
    )
    const dietName: string = paramTransformed
        .slice(0, paramTransformed.length - 1)
        .join(' ')

    const diet: MealData | undefined = mealData.find(
        (meal) =>
            meal.id === dietID &&
            meal.name.toLowerCase() === dietName.toLowerCase()
    )

    return diet as MealData
}

export async function generateMetadata({ params }: any) {
    const id = params.id
    const metaInfo = await fetchDiet(id)

    if (!metaInfo) {
        return {
            title: 'RAGE Diet not found',
            description: 'RAGE Diet not found',
        }
    }

    // Return metadata with information from metaInfo
    return {
        title: 'RAGE Diet ' + metaInfo.name,
        description: metaInfo.preparation_steps[0] + '...',
        openGraph: {
            images: metaInfo.image[0],
        },
    }
}

export default async function Recipe({ params }: any) {
    const id = params.id
    const diet = await fetchDiet(id)

    return (
        <>
            {diet && (
                <div className="h-screen mt-32">
                    <RecipePage recipe={diet} />
                </div>
            )}

            {!diet && (
                <div className="h-screen bg-white w-full flex justify-center align-middle items-center">
                    <NotFound />
                </div>
            )}
        </>
    )
}
