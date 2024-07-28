
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { mealData } from "@/app/api/diet/mealData";

import { Card, CardContent } from "@/components/ui/card"

interface RecipeSuggestion {
    name: string;
    image: string;

}


export default function RecipeSuggestion() {

    const recipes = mealData
    const showCase: RecipeSuggestion[] = recipes.map(rec => ({ name: rec.name, image: rec.image }));

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full ">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-3/4 sm:w-11/12"
                >
                    <CarouselContent className="mx-auto">
                        {showCase.map((rec, idx) => (
                            <CarouselItem key={idx} className="sm:basis-1/2 xl:basis-1/5 hover:scale-[1.01] duration-500 rounded-2xl cursor-pointer">
                                <div key={idx} className="w-52 h-52 ml-2 sm:ml-0 bg-blue-950 rounded-2xl flex flex-col gap-3 items-center ">
                                    <div className="w-full h-32">
                                        <img
                                            src={`/meals/${rec.image}`}
                                            alt={rec.name}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    </div>

                                    <span className="text-xl line-clamp-2 text-slate-50 px-2 text-center font-bold">{rec.name}</span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}



