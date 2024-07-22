import { MealData } from '@/app/api/meals/mealData'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

import { RiCompassLine } from 'react-icons/ri'

export default function MealDialog(props: { meal: MealData }) {
    const meal = props?.meal

    return (
        <>
            <Dialog>
                <DialogTrigger className="my-3 w-1/2 text-xl bg-blue-900 text-slate-50 rounded-2xl px-3 py-1 capitalize cursor-pointer hover:bg-blue-950 duration-500 flex items-center justify-center">
                    Explore
                    <RiCompassLine className="text-xl inline-flex mx-2 mb-0.5" />
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-[60vw] sm:min-h-[80vh] p-5 rounded-2xl shadow-xl overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            {meal?.name}
                        </DialogTitle>
                        <DialogDescription>
                            <div className="mt-4 h-[70vh] mx-auto overflow-y-auto overflow-x-hidden">
                                <div className="flex flex-col xl:flex-row-reverse gap-6">
                                    <div className="flex w-full h-72 xl:h-auto xl:w-1/2 overflow-hidden rounded-2xl justify-center items-center bg-gray-100">
                                        <Image
                                            height={0}
                                            width={0}
                                            sizes="100vw"
                                            src={`/meals/${meal?.image}`}
                                            alt={meal.name}
                                            className="object-cover h-full w-full rounded-2xl hover:scale-105 duration-700"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2 p-6  rounded-2xl shadow-inner">
                                        <div className="mb-6">
                                            <div className="font-bold text-xl mb-2 text-gray-900">
                                                {meal.name}
                                            </div>
                                            <div className="text-gray-700 text-base">
                                                <span className="block">
                                                    Tags: {meal.tags.join(', ')}
                                                </span>
                                                <span className="block">
                                                    {meal.vegetarian
                                                        ? 'Vegetarian'
                                                        : 'Non-Vegetarian'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                                Ingredients
                                            </h3>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {meal.ingredients.map(
                                                    (ig, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex justify-between"
                                                        >
                                                            <span>
                                                                {ig.item}
                                                            </span>
                                                            <span>
                                                                {ig.quantity}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                                Preparation Steps
                                            </h3>
                                            <ol className="list-decimal list-inside text-gray-700 space-y-1">
                                                {meal.preparation_steps.map(
                                                    (prep, idx) => (
                                                        <li key={idx}>
                                                            {prep}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                                Nutritional Information
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                                <span>
                                                    Calories:{' '}
                                                    {
                                                        meal
                                                            .nutritional_information
                                                            .calories
                                                    }
                                                </span>
                                                <span>
                                                    Carbohydrates:{' '}
                                                    {
                                                        meal
                                                            .nutritional_information
                                                            .carbohydrates
                                                    }
                                                </span>
                                                <span>
                                                    Fats:{' '}
                                                    {
                                                        meal
                                                            .nutritional_information
                                                            .fats
                                                    }
                                                </span>
                                                <span>
                                                    Protein:{' '}
                                                    {
                                                        meal
                                                            .nutritional_information
                                                            .protein
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex mb-6 flex-col">
                                            <div className="flex gap-5">
                                                <a
                                                    href={meal.website}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Visit Website
                                                </a>

                                                <a
                                                    href={meal.video}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Watch Video
                                                </a>
                                            </div>
                                            <div className="mt-4">
                                                <iframe
                                                    className="rounded-2xl w-full h-64"
                                                    src={`https://www.youtube.com/embed/${meal.video.split('=')[1]}`}
                                                    title={meal.name}
                                                    frameBorder="0"
                                                    allow="accelerometer; encrypted-media; picture-in-picture"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
