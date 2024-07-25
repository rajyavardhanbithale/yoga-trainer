'use client'

export default function DietFavorite(props: { diet: any }) {
    return (
        <>
            {props?.diet.slice(0, 5).map((meal: any, idx: number) => (
                <div
                    key={idx}
                    className="flex w-full bg-slate-100 px-2 py-0.5 rounded-2xl shadow-md hover:scale-105 duration-300"
                >
                    <div className="h-full overflow-hidden p-2 flex-shrink-0">
                        <img
                            src={`/meals/${meal.image}`}
                            alt="Default"
                            className="w-14 h-14 object-cover rounded-2xl hover:scale-105 duration-700"
                        />
                    </div>
                    <div className="ml-4 flex  items-center justify-between  w-full">
                        <h2 className="text-xl font-semibold">{meal.name}</h2>

                        <div className="w-10 p-2 bg-blue-900 text-center text-slate-50 mx-2 font-bold rounded-xl">
                            x{meal.count}
                        </div>
                    </div>
                </div>
            ))}

            {!props?.diet && (
                <div className="w-full bg-slate-200 rounded-2xl my-2 h-[30vh] text-2xl flex justify-center align-middle items-center">
                    No recent diet found
                </div>
            )}
        </>
    )
}
