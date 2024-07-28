'use client'

import { MealData } from '@/app/api/diet/mealData'
import Image from 'next/image'
import { LuVegan } from 'react-icons/lu'
import { TbMeat } from 'react-icons/tb'
import DietDialog from './DietDialog'
import { useRouter } from 'next/navigation'
import DietUserLike from './DietUserLike'
import { MdArrowOutward } from 'react-icons/md'
import Link from 'next/link'

export default function DietCard(props: { meals: MealData }) {
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

        searchParams.set('overlay', 'true')
        searchParams.set('tag', `${tag}${prevTag ? `,${prevTag}` : ''}`)

        const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`
        overlay ? router.replace(newUrl) : router.push(newUrl)
    }

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

                <div className="flex flex-col px-6 py-2 justify-evenly h-[60%]">
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

                    <div className="flex flex-wrap gap-2 my-2">
                        {meal.tags.map((tag, idx1) => (
                            <button
                                onClick={() => handleTagRoute(tag)}
                                className="text-base bg-blue-700 text-white rounded-2xl px-3 py-1 capitalize cursor-pointer hover:bg-blue-900 transition-colors duration-300"
                                key={idx1}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col xl:flex-row  gap-3 w-full ">
                        <DietDialog meal={meal} />
                        <Link
                            href={`/diet/${meal.name.toLocaleLowerCase().replaceAll(' ', '-')}-${meal.id}`}
                        >
                            <button className="xl:my-3 w-3/4 xl:w-full text-xl bg-blue-900 text-slate-50 rounded-2xl px-5 py-1 capitalize cursor-pointer hover:bg-blue-950 duration-500">
                                Read More
                                <MdArrowOutward className="text-xl inline-flex  mb-0.5" />
                            </button>
                        </Link>
                    </div>
                    <DietUserLike
                        mealId={meal.id}
                        mealLike={meal.likes}
                        mealViews={meal.views}
                    />
                </div>
            </div>
        </>
    )
}
