import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { mealData } from "@/app/api/diet/mealData";
import DietSectionAnimation from "./DietSectionAnimation";


export default async function DietSectionCard() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('food-data')
        .select('*')
        .limit(3)
        .order('likes', { ascending: false });

    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    const dataMap = data ? new Map(data.map((food) => [food.id, { likes: food.likes, views: food.views }])) : new Map();

    const diets = mealData
        .filter((meal) => dataMap.has(meal.id))
        .map((meal) => ({
            ...meal,
            likes: dataMap.get(meal.id).likes,
            views: dataMap.get(meal.id).views,
        }));

    return (
        <>
            <div className="flex sm:flex-row flex-col gap-5">
                {diets.length > 0 ? (
                    diets.map((diet, idx) => (
                        <DietSectionAnimation key={idx} index={idx} diet={diet} />
                    ))
                ) : (
                    <div className="text-center text-slate-500">No diet data available.</div>
                )}
            </div>
        </>
    );
}
