
import { mealData } from "../api/meals/mealData";

import MealInput from "../components/Meal/MealInput";
import MealNoResult from "../components/Meal/MealNoResult";
import MealCard from "../components/Meal/MealCard";
import MealTag from "../components/Meal/MealTag";



export default async function Meals({
    searchParams
}: {
    searchParams?: { search?: string; tag?: string } | undefined
}) {


    const tagParam = searchParams?.tag
    const search = searchParams?.search?.toLowerCase()

    const tag = tagParam ? tagParam.split(',') : null;


    const filter = (tag: string[] | null, search: string | undefined) => {
        if (!tag && !search) {
            return mealData;
        }

        return mealData
            .filter(item => tag ? tag.every(t => item.tags.includes(t)) : true)
            .filter(item => search ? item.name.toLowerCase().includes(search.toLowerCase()) || item.tags.includes(search.toLowerCase()) : true)
    };

    const filteredMeals = filter(tag, search)


    return (
        <>
            <div className="min-h-screen bg-gray-50 w-full p-8">
                <h1 className="text-5xl mt-12 font-extrabold mb-8 text-center text-blue-950">Healthy Diet Essentials</h1>
                <div className="max-w-2xl mx-auto my-5">
                    <MealInput />
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
                        <span className="text-2xl px-5 mx-5 capitalize font-semibold text-slate-700">Tags</span>
                        <div className="flex flex-wrap gap-2 px-5 mx-5 my-2">
                            {tag.map((tag, idx) => (
                                <MealTag mealTag={tag} key={idx} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-10 justify-center">
                    {filteredMeals.length === 0 && <MealNoResult />}
                    {filteredMeals.map((meal, idx) => (
                        <MealCard meals={meal} key={idx} />
                    ))}
                </div>
            </div>

        </>
    )
}