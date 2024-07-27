import { MealData, mealData } from '@/app/api/diet/mealData'
import DietInput from '@/app/components/Diet/DietInput'
import DietSearchNoResult from '@/app/components/Diet/DietSearchNoResult'
import DietCard from '@/app/components/Diet/DietCard'
import DietTags from '@/app/components/Diet/DietTags'
import { createClient } from '@/utils/supabase/server'

interface Like {
    id: number
    likes: number
}

export default async function Meals({
    searchParams,
}: {
    searchParams?: { search?: string; tag?: string } | undefined
}) {
    const tagParam = searchParams?.tag
    const search = searchParams?.search?.toLowerCase()
    const tag = tagParam ? tagParam.split(',') : null

    const filter = (tag: string[] | null, search: string | undefined) => {
        if (!tag && !search) {
            return mealData
        }

        return mealData
            .filter((item) =>
                tag ? tag.every((t) => item.tags.includes(t)) : true
            )
            .filter((item) =>
                search
                    ? item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.tags.includes(search.toLowerCase())
                    : true
            )
    }

    const filteredMeals = filter(tag, search)

    const supabase = createClient()

    const { data, error } = await supabase.from('food-data').select()

    const combineMealsAndLikes = (
        meals: MealData[],
        likes: any
    ): (MealData & { likes: number })[] => {
        const likesMap: Record<number, number> = likes.reduce(
            (acc: any, like: any) => {
                acc[like.id] = like.likes
                return acc
            },
            {} as Record<number, number>
        )

        return meals.map((meal) => ({
            ...meal,
            likes: likesMap[meal.id] || 0,
        }))
    }

    const merge = combineMealsAndLikes(filteredMeals, data)

    return (
        <>
            <div className="min-h-screen bg-gray-50 w-full p-8">
                <h1 className="text-5xl mt-12 font-extrabold mb-8 text-center text-blue-950">
                    Healthy Diet Essentials
                </h1>
                <div className="max-w-2xl mx-auto my-5">
                    <DietInput />
                </div>

                {search && (
                    <div className="my-5">
                        <span className="text-xl px-5 mx-5 capitalize font-semibold text-slate-700">
                            Search Result For <b>&ldquo;{search}&ldquo;</b>
                        </span>
                    </div>
                )}

                {tag && (
                    <div className="my-5">
                        <span className="text-2xl px-5 mx-5 capitalize font-semibold text-slate-700">
                            Tags
                        </span>
                        <div className="flex flex-wrap gap-2 px-5 mx-5 my-2">
                            {tag.map((tag, idx) => (
                                <DietTags mealTag={tag} key={idx} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-10 justify-center">
                    {merge.length === 0 && <DietSearchNoResult />}
                    {merge.map((meal, idx: number) => (
                        <DietCard meals={meal} key={idx} />
                    ))}
                </div>
            </div>
        </>
    )
}
