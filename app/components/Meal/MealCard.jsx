import React from 'react';

export default function MealCard({ meal }) {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-40">
                    <img
                        src={'/meals/'+meal.image}
                        alt={meal.name}
                        className="absolute h-full w-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">{meal.name}</h2>
                    <p className="text-gray-600 mb-4">{meal.meal_type}</p>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Ingredients:</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient.item} - {ingredient.quantity}</li>
                        ))}
                    </ul>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Preparation Steps:</h3>
                    <ol className="list-decimal list-inside text-gray-700 mb-4">
                        {meal.preparation_steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ol>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Nutritional Information:</h3>
                    <p className="text-gray-700">Calories: {meal.nutritional_information.calories}</p>
                    <p className="text-gray-700">Protein: {meal.nutritional_information.protein}</p>
                    <p className="text-gray-700">Carbohydrates: {meal.nutritional_information.carbohydrates}</p>
                    <p className="text-gray-700">Fats: {meal.nutritional_information.fats}</p>
                </div>
            </div>
        </>
    )
}



