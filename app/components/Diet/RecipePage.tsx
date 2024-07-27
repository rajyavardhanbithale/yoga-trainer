
import React from 'react';

const recipe = {
    id: 101,
    meal_type: 'Breakfast',
    name: 'Green Smoothie Bowl',
    image: 'green-smoothie-bowl.webp',
    ingredients: [
        { item: 'Spinach', quantity: '1 cup' },
        { item: 'Banana', quantity: '1' },
        { item: 'Almond Milk', quantity: '1/2 cup' },
        { item: 'Chia Seeds', quantity: '1 tbsp' },
        { item: 'Granola', quantity: '1/4 cup' },
        { item: 'Mixed Berries', quantity: '1/2 cup' },
    ],
    preparation_steps: [
        'Blend spinach, banana, and almond milk until smooth.',
        'Pour into a bowl and top with chia seeds, granola, and mixed berries.',
    ],
    nutritional_information: {
        calories: 350,
        protein: '7g',
        carbohydrates: '55g',
        fats: '10g',
    },
    tags: ['breakfast', 'smoothie', 'fruit', 'quick', 'nutrient-dense'],
    vegetarian: true,
    website: 'https://minimalistbaker.com/super-green-smoothie-bowl/',
    video: 'https://www.youtube.com/watch?v=q5-r7RpOooU',
};

export default function RecipePage() {
    return (
        <div className="flex h-screen">
            <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col gap-5 bg-slate-50 overflow-auto">
                <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>

                <div className="flex md:flex-col gap-3 xl:flex-row">
                    <button className="w-fit text-lg bg-blue-800 text-slate-50 px-3 py-1 font-bold rounded-2xl">
                        {recipe.meal_type}
                    </button>

                    <div className="flex flex-wrap gap-3 xl:px-10">
                        {recipe.tags.map((tag, idx) => (
                            <button
                                key={idx}
                                className="capitalize text-lg bg-blue-900 text-slate-50 px-3 py-1 font-bold rounded-2xl">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="mt-5 flex gap-10">

                    <div className="w-1/2 border-2 p-4 rounded-2xl">
                        <h3 className="text-3xl font-semibold mb-2 text-gray-900">
                            Ingredients
                        </h3>

                        <ul className="list-disc list-inside text-slate-800 space-y-1 ">
                            {recipe.ingredients.map(
                                (ig, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between text-xl"
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

                    <div className="w-1/2 border-2 p-4 rounded-2xl">
                        <h2 className="text-3xl font-semibold mb-4">Preparation Steps</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            {recipe.preparation_steps.map((step, index) => (
                                <li key={index} className="text-slate-800">{step}</li>
                            ))}
                        </ol>
                    </div>

                </div>

                <div className="">
                    <h2 className="text-3xl font-semibold mb-4">Nutritional Information</h2>
                    <ul className="space-y-2">
                        <li className="text-slate-800">
                            <span className="font-semibold">Calories:</span> {recipe.nutritional_information.calories}
                        </li>
                        <li className="text-slate-800">
                            <span className="font-semibold">Protein:</span> {recipe.nutritional_information.protein}
                        </li>
                        <li className="text-slate-800">
                            <span className="font-semibold">Carbohydrates:</span> {recipe.nutritional_information.carbohydrates}
                        </li>
                        <li className="text-slate-800">
                            <span className="font-semibold">Fats:</span> {recipe.nutritional_information.fats}
                        </li>
                    </ul>
                </div>

                <div className="">
                    <span className="text-slate-900 text-lg">Vegetarian:</span> {recipe.vegetarian ? 'Yes' : 'No'}
                </div>
                <div className="flex space-x-4">
                    <a href={recipe.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Recipe Website
                    </a>
                    <a href={recipe.video} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Watch Video
                    </a>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/3">
                <img
                    src={`/meals/${recipe.image}`}
                    alt={recipe.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};


