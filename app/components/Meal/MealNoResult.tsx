import { FcBinoculars } from "react-icons/fc";

export default function MealNoResult() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-1/2">
                <FcBinoculars className="text-7xl" />

                <p className="mt-4 text-xl font-medium text-gray-600">No Search Found</p>
                <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
            </div>
        </>
    )
}