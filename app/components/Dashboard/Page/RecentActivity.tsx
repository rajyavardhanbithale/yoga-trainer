import * as React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

export default function RecentActivity(recentActivities: any) {
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-11/12 mx-auto"
        >
            <CarouselContent>
                {recentActivities &&
                    recentActivities.recentActivities?.map(
                        (item: any, idx: number) => (
                            <CarouselItem key={idx} className="sm:basis-1/3">
                                <Link href={`/practice?id=${item.id}`}>
                                    <div
                                        key={idx}
                                        className="flex justify-center items-center p-4"
                                    >
                                        <div className="w-full max-w-xs flex flex-col items-center bg-slate-200 shadow-md rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                                            <div className="w-full flex justify-center bg-gray-200 p-4">
                                                <img
                                                    src={`/pose/image/webp/${item?.image}`}
                                                    alt={item.name}
                                                    className="h-32 object-contain mix-blend-multiply rounded-lg"
                                                />
                                            </div>

                                            <div className="flex flex-col text-center">
                                                <span className="capitalize mt-4 text-lg font-semibold text-slate-800 line-clamp-1">
                                                    {item.name}
                                                </span>
                                                <span className="capitalize mt-2 mb-4 text-lg font-semibold text-slate-800 line-clamp-1">
                                                    {item.originalName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        )
                    )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
