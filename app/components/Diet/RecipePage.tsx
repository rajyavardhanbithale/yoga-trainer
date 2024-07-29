import RecipeExternalWebsite from './RecipeExternalWebsite'

import RecipeSuggestion from './RecipeSuggestion'
import RecipePageSocials from './RecipePageSocials'
import Image from 'next/image'
import { MealData } from '@/app/api/diet/mealData'

export default function RecipePage(props: { recipe: MealData }) {
    const recipe = props.recipe

    return (
        <div className="flex bg-white">
            <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col gap-5 bg-white">
                <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>

                <div className="flex flex-wrap sm:flex-col gap-3 xl:flex-row">
                    <button
                        className={`w-fit text-lg text-slate-50 px-3 py-1 font-bold rounded-2xl ${recipe.vegetarian ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {recipe.meal_type}
                    </button>

                    <div className="flex flex-wrap gap-3 xl:px-10">
                        {recipe.tags.map((tag, idx) => (
                            <button
                                key={idx}
                                className="capitalize text-base bg-blue-900 text-slate-50 px-3 py-0.5 font-bold rounded-2xl"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-5 flex sm:flex-row flex-col gap-10">
                    <div className="sm:w-1/2 border-2 p-4 rounded-2xl">
                        <h3 className="text-3xl font-semibold mb-2 text-gray-900">
                            Ingredients
                        </h3>

                        <ul className="list-disc list-inside text-slate-800 space-y-1 ">
                            {recipe.ingredients.map((ig, idx) => (
                                <li key={idx} className="flex justify-between">
                                    <span>{ig.item}</span>
                                    <span>{ig.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sm:w-1/2 border-2 p-4 rounded-2xl">
                        <h2 className="text-3xl font-semibold mb-4">
                            Preparation
                        </h2>
                        <ol className="list-decimal list-inside space-y-2">
                            {recipe.preparation_steps.map((step, index) => (
                                <li key={index} className="text-slate-800">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="w-full border-2 p-4 rounded-2xl flex flex-wrap gap-5 items-center align-middle">
                    <h2 className="text-2xl font-semibold">
                        Nutritional Information
                    </h2>
                    <ul className="flex flex-wrap items-center gap-5 h-auto">
                        <li className="text-slate-50 bg-blue-900 px-2 py-1.5 rounded-2xl flex gap-2">
                            <span className="font-semibold">Calories</span>
                            <span className="font-bold">
                                {recipe.nutritional_information.calories}
                            </span>
                        </li>
                        <li className="text-slate-50 bg-blue-900 px-2 py-1.5 rounded-2xl flex gap-2">
                            <span className="font-semibold">Protein</span>
                            <span className="font-bold">
                                {recipe.nutritional_information.protein}
                            </span>
                        </li>
                        <li className="text-slate-50 bg-blue-900 px-2 py-1.5 rounded-2xl flex gap-2">
                            <span className="font-semibold">Carbohydrates</span>
                            <span className="font-bold">
                                {recipe.nutritional_information.carbohydrates}
                            </span>
                        </li>
                        <li className="text-slate-50 bg-blue-900 px-2 py-1.5 rounded-2xl flex gap-2">
                            <span className="font-semibold">Fats</span>
                            <span className="font-bold">
                                {recipe.nutritional_information.fats}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="w-full h-[50vh] bg-slate-300">
                    <iframe
                        className="rounded-2xl h-full w-full"
                        src={`https://www.youtube.com/embed/${recipe.video.split('=')[1]}`}
                        title={recipe.name}
                        frameBorder="0"
                        allow="accelerometer; encrypted-media; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="flex flex-col mt-10 gap-4">
                    <h2 className="text-3xl font-semibold mb-5">
                        Browse Other Diets
                    </h2>
                    <RecipeSuggestion></RecipeSuggestion>
                </div>
            </div>
            <div className="relative my-auto hidden h-screen lg:block lg:w-1/3 bg-white">
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    loading="eager"
                    src={`/meals/${recipe.image}`}
                    alt={recipe.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />

                <div className="fixed mt-32 top-5 right-5 flex flex-col gap-3 text-4xl glass-card p-2">
                    <RecipePageSocials mealID={recipe.id}></RecipePageSocials>
                </div>

                <div className="fixed bottom-5 -right-14 xl:right-0 xl:px-2">
                    <RecipeExternalWebsite website={recipe.website} />
                </div>
            </div>

            <div className="sm:hidden relative">
                <div className="absolute top-10 right-2 flex flex-col gap-3 text-4xl glass-card p-2">
                    <RecipePageSocials mealID={recipe.id}></RecipePageSocials>
                </div>
            </div>
        </div>
    )
}
