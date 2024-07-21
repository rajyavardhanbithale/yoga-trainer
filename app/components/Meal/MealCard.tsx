'use client'

import { MealData } from "@/app/api/meals/mealData";
import Image from "next/image";
import Link from "next/link";
import { LuVegan } from "react-icons/lu";
import { TbMeat } from "react-icons/tb";
import MealDialog from "./MealDialog";
import { useRouter, useSearchParams } from "next/navigation";

export default function MealCard(props: { meals: MealData }) {
    const meal = props?.meals
    const router = useRouter()

    const handleTagRoute = (tag: string) => {
        // overlay param in url is used to disconnect the main meal page from the next param page
        // problem without overlay is that whenever the new tag is added to url 
        // and the user 'back' the page it takes long to navigate back to the main 'meal' page if there are nested tags
        
        const currentUrl = new URL(window.location.href)
        const searchParams = new URLSearchParams(currentUrl.search)
        const overlay = searchParams.get('overlay') || null

        const prevTag = searchParams.get('tag') || null
        

        searchParams.set('overlay', 'true');
        searchParams.set('tag', `${tag}${prevTag ? `,${prevTag}` : ''}`)
    
        const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`
        overlay ? router.replace(newUrl) : router.push(newUrl)

    };

    return (
        <>
            <div className="flex flex-col sm:w-1/3 xl:w-1/4 m-5 rounded-2xl shadow-lg bg-white">
                <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                    <Image
                        src={`/meals/${meal.image}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="-z-50 w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700"
                        alt={meal.name}

                    />
                    {/* <div className="z-50 bg-slate-300 h-full w-full animate-pulse"></div> */}
                </div>

                <div className="flex flex-col p-6">
                    <span className="text-2xl font-semibold text-gray-800 leading-tight">
                        {meal.name}
                        {meal.name.split(' ').length <= 3 && <br />}
                    </span>

                    <span className="text-lg font-medium text-gray-600 mt-2">
                        {meal.meal_type}
                        {meal.vegetarian ? (
                            <LuVegan className="text-xl inline-flex mx-2 text-green-500 mb-1" />
                        ) : (
                            <TbMeat className="text-xl inline-flex mx-2 text-red-500 mb-1" />
                        )}
                    </span>

                    <div className="flex flex-wrap gap-2 my-5">
                        {meal.tags.map((tag, idx1) => (
                            <button 
                                onClick={()=>handleTagRoute(tag)}
                                className="text-base bg-blue-700 text-white rounded-2xl px-3 py-1 capitalize cursor-pointer hover:bg-blue-900 transition-colors duration-300"
                                key={idx1}
                            >
                                {tag}
                            </button>

                        ))}
                    </div>
                    <MealDialog meal={meal} />
                </div>
            </div>
        </>
    )
}