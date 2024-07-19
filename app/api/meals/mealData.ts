interface MealData {
    meal_type: string
    name: string
    image: string
    ingredients: {
        item: string,
        quantity: string
    }[]
    preparation_steps: string[]
    nutritional_information: {
        calories: number
        protein: string
        carbohydrates: string
        fats: string
    }
    tags: string[]
    vegetarian: boolean

}

export const mealData: MealData[] = [
    {
        meal_type: "Breakfast",
        name: "Green Smoothie Bowl",
        image: "green-smoothie-bowl.jpg",
        ingredients: [
            { item: "Spinach", quantity: "1 cup" },
            { item: "Banana", quantity: "1" },
            { item: "Almond Milk", quantity: "1/2 cup" },
            { item: "Chia Seeds", quantity: "1 tbsp" },
            { item: "Granola", quantity: "1/4 cup" },
            { item: "Mixed Berries", quantity: "1/2 cup" }
        ],
        preparation_steps: [
            "Blend spinach, banana, and almond milk until smooth.",
            "Pour into a bowl and top with chia seeds, granola, and mixed berries."
        ],
        nutritional_information: {
            calories: 350,
            protein: "7g",
            carbohydrates: "55g",
            fats: "10g"
        },
        tags: ["breakfast", "smoothie", "fruit", "quick", "nutrient-dense"],
        vegetarian: true
    },
    {
        meal_type: "Lunch",
        name: "Quinoa Salad",
        image: "quinoa-salad.jpg",
        ingredients: [
            { item: "Quinoa", quantity: "1 cup" },
            { item: "Cucumber", quantity: "1/2, diced" },
            { item: "Cherry Tomatoes", quantity: "1 cup, halved" },
            { item: "Red Onion", quantity: "1/4, diced" },
            { item: "Feta Cheese", quantity: "1/4 cup, crumbled" },
            { item: "Lemon Juice", quantity: "2 tbsp" },
            { item: "Olive Oil", quantity: "2 tbsp" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Cook quinoa according to package instructions and let it cool.",
            "In a large bowl, combine quinoa, cucumber, cherry tomatoes, red onion, and feta cheese.",
            "Drizzle with lemon juice and olive oil.",
            "Season with salt and pepper to taste."
        ],
        nutritional_information: {
            calories: 420,
            protein: "12g",
            carbohydrates: "58g",
            fats: "15g"
        },
        tags: ["lunch", "salad", "protein", "mediterranean", "gluten-free"],
        vegetarian: true
    },
    {
        meal_type: "Dinner",
        name: "Baked Salmon with Asparagus",
        image: "baked-salmon-with-asparagus.jpg",
        ingredients: [
            { item: "Salmon Fillet", quantity: "1 (6 oz)" },
            { item: "Asparagus", quantity: "1 bunch" },
            { item: "Olive Oil", quantity: "1 tbsp" },
            { item: "Garlic", quantity: "2 cloves, minced" },
            { item: "Lemon", quantity: "1, sliced" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Preheat oven to 400°F (200°C).",
            "Place salmon fillet and asparagus on a baking sheet.",
            "Drizzle with olive oil and sprinkle with minced garlic, salt, and pepper.",
            "Place lemon slices on top of the salmon.",
            "Bake for 15-20 minutes or until the salmon is cooked through and asparagus is tender."
        ],
        nutritional_information: {
            calories: 450,
            protein: "35g",
            carbohydrates: "8g",
            fats: "30g"
        },
        tags: ["dinner", "seafood", "omega-3", "low-carb", "high-protein"],
        vegetarian: false
    },
    {
        meal_type: "Snack",
        name: "Hummus with Veggies",
        image: "hummus-with-veggies.jpg",
        ingredients: [
            { item: "Hummus", quantity: "1/2 cup" },
            { item: "Carrot Sticks", quantity: "1 cup" },
            { item: "Celery Sticks", quantity: "1 cup" },
            { item: "Bell Pepper Slices", quantity: "1 cup" }
        ],
        preparation_steps: [
            "Arrange carrot sticks, celery sticks, and bell pepper slices on a plate.",
            "Serve with a side of hummus for dipping."
        ],
        nutritional_information: {
            calories: 200,
            protein: "6g",
            carbohydrates: "25g",
            fats: "10g"
        },
        tags: ["snack", "vegetable", "protein", "low-calorie", "quick"],
        vegetarian: true
    },
    {
        meal_type: "Breakfast",
        name: "Oatmeal with Fruits and Nuts",
        image: "oatmeal-with-fruits-and-nuts.jpg",
        ingredients: [
            { item: "Rolled Oats", quantity: "1/2 cup" },
            { item: "Almond Milk", quantity: "1 cup" },
            { item: "Banana", quantity: "1, sliced" },
            { item: "Blueberries", quantity: "1/4 cup" },
            { item: "Almonds", quantity: "2 tbsp, chopped" },
            { item: "Honey", quantity: "1 tsp" }
        ],
        preparation_steps: [
            "Cook rolled oats with almond milk over medium heat until desired consistency is reached.",
            "Top with sliced banana, blueberries, chopped almonds, and a drizzle of honey."
        ],
        nutritional_information: {
            calories: 350,
            protein: "8g",
            carbohydrates: "65g",
            fats: "8g"
        },
        tags: ["breakfast", "oatmeal", "fruit", "nuts", "fiber"],
        vegetarian: true
    },
    {
        meal_type: "Lunch",
        name: "Veggie Wrap",
        image: "veggie-wrap.jpg",
        ingredients: [
            { item: "Whole Wheat Tortilla", quantity: "1" },
            { item: "Hummus", quantity: "2 tbsp" },
            { item: "Spinach", quantity: "1 cup" },
            { item: "Avocado", quantity: "1/2, sliced" },
            { item: "Bell Pepper", quantity: "1/2, sliced" },
            { item: "Cucumber", quantity: "1/4, sliced" }
        ],
        preparation_steps: [
            "Spread hummus on the whole wheat tortilla.",
            "Layer with spinach, avocado slices, bell pepper slices, and cucumber slices.",
            "Roll up the tortilla tightly and slice in half."
        ],
        nutritional_information: {
            calories: 300,
            protein: "8g",
            carbohydrates: "40g",
            fats: "12g"
        },
        tags: ["lunch", "wrap", "vegetable", "quick", "portable"],
        vegetarian: true
    },
    {
        meal_type: "Dinner",
        name: "Vegetable Stir-Fry with Tofu",
        image: "vegetable-stir-fry-with-tofu.jpg",
        ingredients: [
            { item: "Firm Tofu", quantity: "1 block, cubed" },
            { item: "Broccoli", quantity: "1 cup, chopped" },
            { item: "Bell Peppers", quantity: "1 cup, sliced" },
            { item: "Carrots", quantity: "1 cup, sliced" },
            { item: "Soy Sauce", quantity: "2 tbsp" },
            { item: "Olive Oil", quantity: "1 tbsp" },
            { item: "Garlic", quantity: "2 cloves, minced" },
            { item: "Ginger", quantity: "1 inch, grated" }
        ],
        preparation_steps: [
            "Heat olive oil in a large skillet over medium heat.",
            "Add garlic and ginger, sauté for 1-2 minutes.",
            "Add tofu cubes and cook until golden brown.",
            "Add broccoli, bell peppers, and carrots. Stir-fry for 5-7 minutes.",
            "Pour soy sauce over the vegetables and tofu, stir to combine. Cook for an additional 2-3 minutes."
        ],
        nutritional_information: {
            calories: 350,
            protein: "20g",
            carbohydrates: "30g",
            fats: "15g"
        },
        tags: ["dinner", "stir-fry", "tofu", "vegetable", "protein"],
        vegetarian: true
    },
    {
        meal_type: "Snack",
        name: "Greek Yogurt with Honey and Nuts",
        image: "greek-yogurt-with-honey-and-Nuts.jpg",
        ingredients: [
            { item: "Greek Yogurt", quantity: "1 cup" },
            { item: "Honey", quantity: "1 tbsp" },
            { item: "Walnuts", quantity: "2 tbsp, chopped" }
        ],
        preparation_steps: [
            "Spoon Greek yogurt into a bowl.",
            "Drizzle with honey and sprinkle with chopped walnuts."
        ],
        nutritional_information: {
            calories: 250,
            protein: "15g",
            carbohydrates: "30g",
            fats: "10g"
        },
        tags: ["snack", "protein", "dairy", "quick", "sweet"],
        vegetarian: true
    },

]

