export interface MealData {
    id: number
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
    website: string
    video: string
    likes?: number
}

export const mealData: MealData[] = [
    {
        id: 101,
        meal_type: "Breakfast",
        name: "Green Smoothie Bowl",
        image: "green-smoothie-bowl.webp",
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
        vegetarian: true,
        website: "https://minimalistbaker.com/super-green-smoothie-bowl/",
        video: "https://www.youtube.com/watch?v=q5-r7RpOooU"
    },
    {
        id: 102,
        meal_type: "Lunch",
        name: "Quinoa Salad",
        image: "quinoa-salad.webp",
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
        vegetarian: true,
        website: "https://cookingwithayeh.com/quinoa-salad/",
        video: "https://www.youtube.com/watch?v=3QEjP3X3aBI"
    },
    {
        id: 103,
        meal_type: "Dinner",
        name: "Baked Salmon with Asparagus",
        image: "baked-salmon-with-asparagus.webp",
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
        vegetarian: false,
        website: "https://natashaskitchen.com/one-pan-salmon-asparagus-recipe-video/",
        video: "https://www.youtube.com/watch?v=Kdq3khk_8n0"
    },
    {
        id: 104,
        meal_type: "Snack",
        name: "Hummus with Veggies",
        image: "hummus-with-veggies.webp",
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
        vegetarian: true,
        website: "https://www.veganeasy.org/recipes/homemade-hummus-with-veggie-sticks",
        video: "https://www.youtube.com/watch?v=CzZToWUHMNM"
    },
    {
        id: 105,
        meal_type: "Breakfast",
        name: "Oatmeal with Fruits and Nuts",
        image: "oatmeal-with-fruits-and-nuts.webp",
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
        vegetarian: true,
        website: "https://www.forksoverknives.com/recipes/vegan-breakfast/fruit-and-nut-healthy-oatmeal",
        video: "https://www.youtube.com/watch?v=3dyy1SyKwCE"
    },
    {
        id: 106,
        meal_type: "Lunch",
        name: "Veggie Wrap",
        image: "veggie-wrap.webp",
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
        vegetarian: true,
        website: "https://www.bowlofdelicious.com/versatile-veggie-wraps",
        video: "https://www.youtube.com/watch?v=5r3vjmrXXmI"
    },
    {
        id: 107,
        meal_type: "Dinner",
        name: "Vegetable Stir-Fry with Tofu",
        image: "vegetable-stir-fry-with-tofu.webp",
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
        vegetarian: true,
        website: "https://jessicainthekitchen.com/tofu-and-veggie-stir-fry-in-sweet-ginger-sauce",
        video: "https://www.youtube.com/watch?v=lNdFgQ4fBCI"
    },
    {
        id: 108,
        meal_type: "Snack",
        name: "Greek Yogurt with Honey and Nuts",
        image: "greek-yogurt-with-honey-and-Nuts.webp",
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
        vegetarian: true,
        website: "https://www.mygreekdish.com/recipe/greek-yogurt-with-honey-walnuts-recipe-yiaourti-meli",
        video: "https://www.youtube.com/watch?v=eqlu2WSUg2k"
    },

    {
        id: 109,
        meal_type: "Breakfast",
        name: "Avocado Toast",
        image: "avocado-toast.webp",
        ingredients: [
            { item: "Whole Grain Bread", quantity: "2 slices" },
            { item: "Avocado", quantity: "1, mashed" },
            { item: "Lemon Juice", quantity: "1 tsp" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Toast the whole grain bread.",
            "Mix mashed avocado with lemon juice, salt, and pepper.",
            "Spread the avocado mixture on the toasted bread."
        ],
        nutritional_information: {
            calories: 350,
            protein: "6g",
            carbohydrates: "40g",
            fats: "20g"
        },
        tags: ["breakfast", "toast", "avocado", "quick", "fiber"],
        vegetarian: true,
        website: "https://www.billyparisi.com/avocado-toast-recipe-different-gourmet-toast-recipes",
        video: "https://www.youtube.com/watch?v=0R5km8AQGlI"
    },
    {
        id: 110,
        meal_type: "Lunch",
        name: "Lentil Soup",
        image: "lentil-soup.webp",
        ingredients: [
            { item: "Lentils", quantity: "1 cup" },
            { item: "Carrots", quantity: "2, diced" },
            { item: "Celery", quantity: "2 stalks, diced" },
            { item: "Onion", quantity: "1, diced" },
            { item: "Garlic", quantity: "2 cloves, minced" },
            { item: "Vegetable Broth", quantity: "4 cups" },
            { item: "Olive Oil", quantity: "1 tbsp" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Heat olive oil in a pot over medium heat.",
            "Sauté onion, garlic, carrots, and celery until softened.",
            "Add lentils and vegetable broth. Bring to a boil.",
            "Reduce heat and simmer until lentils are tender. Season with salt and pepper."
        ],
        nutritional_information: {
            calories: 400,
            protein: "18g",
            carbohydrates: "55g",
            fats: "10g"
        },
        tags: ["lunch", "soup", "lentils", "hearty", "protein"],
        vegetarian: true,
        website: "https://www.allrecipes.com/recipe/13978/lentil-soup/",
        video: "https://www.youtube.com/watch?v=ZCVFUok4h6c"
    },
    {
        id: 111,
        meal_type: "Dinner",
        name: "Stuffed Bell Peppers",
        image: "stuffed-bell-peppers.webp",
        ingredients: [
            { item: "Bell Peppers", quantity: "4, halved and seeded" },
            { item: "Quinoa", quantity: "1 cup, cooked" },
            { item: "Black Beans", quantity: "1 cup, cooked" },
            { item: "Corn", quantity: "1 cup" },
            { item: "Tomato Sauce", quantity: "1 cup" },
            { item: "Cheddar Cheese", quantity: "1/2 cup, shredded" },
            { item: "Cumin", quantity: "1 tsp" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Preheat oven to 375°F (190°C).",
            "Mix cooked quinoa, black beans, corn, tomato sauce, cumin, salt, and pepper.",
            "Stuff bell pepper halves with the mixture and place in a baking dish.",
            "Top with shredded cheddar cheese.",
            "Bake for 25-30 minutes or until peppers are tender."
        ],
        nutritional_information: {
            calories: 450,
            protein: "18g",
            carbohydrates: "60g",
            fats: "15g"
        },
        tags: ["dinner", "stuffed", "bell peppers", "quinoa", "fiber"],
        vegetarian: true,
        website: "https://www.foodnetwork.com/recipes/ree-drummond/stuffed-bell-peppers-3325315",
        video: "https://www.youtube.com/watch?v=ektsiKFVqks"
    },
    {
        id: 112,
        meal_type: "Snack",
        name: "Energy Balls",
        image: "energy-balls.webp",
        ingredients: [
            { item: "Oats", quantity: "1 cup" },
            { item: "Peanut Butter", quantity: "1/2 cup" },
            { item: "Honey", quantity: "1/4 cup" },
            { item: "Chia Seeds", quantity: "2 tbsp" },
            { item: "Dark Chocolate Chips", quantity: "1/4 cup" }
        ],
        preparation_steps: [
            "Mix all ingredients in a large bowl until combined.",
            "Roll the mixture into small balls.",
            "Refrigerate for at least 30 minutes before serving."
        ],
        nutritional_information: {
            calories: 200,
            protein: "6g",
            carbohydrates: "25g",
            fats: "10g"
        },
        tags: ["snack", "energy", "quick", "no-bake", "portable"],
        vegetarian: true,
        website: "https://www.inspiredtaste.net/46840/energy-power-balls/",
        video: "https://www.youtube.com/watch?v=1noPmYc_DxI"
    },
    {
        id: 113,
        meal_type: "Breakfast",
        name: "Chia Pudding",
        image: "chia-pudding.webp",
        ingredients: [
            { item: "Chia Seeds", quantity: "1/4 cup" },
            { item: "Almond Milk", quantity: "1 cup" },
            { item: "Maple Syrup", quantity: "1 tbsp" },
            { item: "Vanilla Extract", quantity: "1 tsp" },
            { item: "Mixed Berries", quantity: "1/2 cup" }
        ],
        preparation_steps: [
            "Mix chia seeds, almond milk, maple syrup, and vanilla extract in a bowl.",
            "Refrigerate for at least 4 hours or overnight.",
            "Top with mixed berries before serving."
        ],
        nutritional_information: {
            calories: 250,
            protein: "6g",
            carbohydrates: "30g",
            fats: "12g"
        },
        tags: ["breakfast", "pudding", "chia", "make-ahead", "fiber"],
        vegetarian: true,
        website: "https://downshiftology.com/recipes/how-to-make-chia-seed-pudding",
        video: "https://www.youtube.com/watch?v=6Ig3Rm1YLRo"
    },
    {
        id: 114,
        meal_type: "Lunch",
        name: "Chickpea Salad",
        image: "chickpea-salad.webp",
        ingredients: [
            { item: "Chickpeas", quantity: "1 can, drained and rinsed" },
            { item: "Cucumber", quantity: "1, diced" },
            { item: "Tomato", quantity: "1, diced" },
            { item: "Red Onion", quantity: "1/4, diced" },
            { item: "Olive Oil", quantity: "2 tbsp" },
            { item: "Lemon Juice", quantity: "2 tbsp" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "In a large bowl, mix chickpeas, cucumber, tomato, and red onion.",
            "Drizzle with olive oil and lemon juice.",
            "Season with salt and pepper to taste."
        ],
        nutritional_information: {
            calories: 300,
            protein: "10g",
            carbohydrates: "40g",
            fats: "12g"
        },
        tags: ["lunch", "salad", "chickpeas", "mediterranean", "quick"],
        vegetarian: true,
        website: "https://www.themediterraneandish.com/chickpea-salad",
        video: "https://www.youtube.com/watch?v=PrJH8QFmtFE"
    },
    {
        id: 115,
        meal_type: "Dinner",
        name: "Mushroom Risotto",
        image: "mushroom-risotto.webp",
        ingredients: [
            { item: "Arborio Rice", quantity: "1 cup" },
            { item: "Mushrooms", quantity: "2 cups, sliced" },
            { item: "Vegetable Broth", quantity: "4 cups" },
            { item: "Onion", quantity: "1, diced" },
            { item: "Garlic", quantity: "2 cloves, minced" },
            { item: "Olive Oil", quantity: "2 tbsp" },
            { item: "Parmesan Cheese", quantity: "1/2 cup, grated" },
            { item: "Salt", quantity: "to taste" },
            { item: "Pepper", quantity: "to taste" }
        ],
        preparation_steps: [
            "Heat olive oil in a pot over medium heat.",
            "Sauté onion and garlic until softened.",
            "Add mushrooms and cook until tender.",
            "Stir in Arborio rice and cook for 1-2 minutes.",
            "Gradually add vegetable broth, stirring constantly until absorbed and rice is creamy.",
            "Stir in grated Parmesan cheese. Season with salt and pepper."
        ],
        nutritional_information: {
            calories: 500,
            protein: "15g",
            carbohydrates: "70g",
            fats: "18g"
        },
        tags: ["dinner", "risotto", "mushrooms", "creamy", "comfort"],
        vegetarian: true,
        website: "https://www.loveandlemons.com/mushroom-risotto",
        video: "https://www.youtube.com/watch?v=ju9H1RlYNxk"
    },
    {
        id: 116,
        meal_type: "Snack",
        name: "Fruit and Nut Mix",
        image: "fruit-and-nut-mix.webp",
        ingredients: [
            { item: "Almonds", quantity: "1/2 cup" },
            { item: "Walnuts", quantity: "1/2 cup" },
            { item: "Dried Cranberries", quantity: "1/2 cup" },
            { item: "Raisins", quantity: "1/2 cup" }
        ],
        preparation_steps: [
            "Mix all ingredients in a bowl.",
            "Store in an airtight container."
        ],
        nutritional_information: {
            calories: 250,
            protein: "6g",
            carbohydrates: "30g",
            fats: "15g"
        },
        tags: ["snack", "fruit", "nuts", "quick", "portable"],
        vegetarian: true,
        website: "https://www.foodandwine.com/recipes/fruit-and-nut-trail-mix",
        video: "https://www.youtube.com/watch?v=DeeBmd7OaX0"
    },
    {
        id: 117,
        meal_type: "Breakfast",
        name: "Smoothie Bowl",
        image: "smoothie-bowl.webp",
        ingredients: [
            { item: "Frozen Berries", quantity: "1 cup" },
            { item: "Banana", quantity: "1" },
            { item: "Spinach", quantity: "1 cup" },
            { item: "Almond Milk", quantity: "1/2 cup" },
            { item: "Granola", quantity: "1/4 cup" },
            { item: "Coconut Flakes", quantity: "2 tbsp" }
        ],
        preparation_steps: [
            "Blend frozen berries, banana, spinach, and almond milk until smooth.",
            "Pour into a bowl and top with granola and coconut flakes."
        ],
        nutritional_information: {
            calories: 350,
            protein: "8g",
            carbohydrates: "65g",
            fats: "10g"
        },
        tags: ["breakfast", "smoothie", "fruit", "quick", "nutrient-dense"],
        vegetarian: true,
        website: "https://themodernproper.com/how-to-make-a-smoothie-bowl",
        video: "https://www.youtube.com/watch?v=kGONo2ghhqg"
    },
    {
        id: 118,
        meal_type: "Lunch",
        name: "Falafel Wrap",
        image: "falafel-wrap.webp",
        ingredients: [
            { item: "Falafel Balls", quantity: "4" },
            { item: "Whole Wheat Tortilla", quantity: "1" },
            { item: "Hummus", quantity: "2 tbsp" },
            { item: "Lettuce", quantity: "1 cup" },
            { item: "Tomato", quantity: "1, sliced" },
            { item: "Cucumber", quantity: "1/4, sliced" },
            { item: "Tzatziki Sauce", quantity: "2 tbsp" }
        ],
        preparation_steps: [
            "Spread hummus on the whole wheat tortilla.",
            "Layer with lettuce, tomato slices, cucumber slices, and falafel balls.",
            "Drizzle with tzatziki sauce.",
            "Roll up the tortilla tightly and slice in half."
        ],
        nutritional_information: {
            calories: 400,
            protein: "12g",
            carbohydrates: "50g",
            fats: "15g"
        },
        tags: ["lunch", "wrap", "falafel", "mediterranean", "protein"],
        vegetarian: true,
        website: "https://avocadoskillet.com/vegan-crispy-deconstructed-falafel-wrap-tahini-sauce",
        video: "https://www.youtube.com/watch?v=b2ypY6L1HLY"
    }



]

