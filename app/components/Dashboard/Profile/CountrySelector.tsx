import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getNames, getCode } from 'country-list';
import Image from "next/image";


export default function CountrySelector(props: any) {
    const [closed, setClosed] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>('')

    function handleCountrySelection(country: string | null) {
        const code = country && getCode(country)?.toLowerCase()
        if (typeof country === 'string') {
            props?.setUserDetails({ ...props?.userDetails, country: code })
            props?.updateCountry(code)
        }
        setTimeout(() => {
            props?.setUserDetails({ ...props?.userDetails, popUpID: null })
        }, 500)
        setClosed(false)
    }


    const countries = getNames().filter(country =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="p-8 rounded-md z-10">
                    <div className={`xl:w-[3/4] w-full h-auto flex flex-col mx-auto  ${closed ? "animate-jump-in" : "animate-jump-out"}`}>
                        <div className="flex gap-4">
                            <span className="w-[90%] text-3xl font-bold mb-2 text-slate-800 bg-white m-2 px-4 py-3 rounded-2xl">
                                Select Country
                            </span>

                            <span className="w-[10%] flex justify-center items-center text-3xl font-bold mb-2 text-slate-900 bg-white m-2 px-4 py-3 rounded-2xl">
                                <IoIosCloseCircleOutline
                                    onClick={() => handleCountrySelection(null)}
                                    className="cursor-pointer hover:scale-105 duration-500 shadow-2xl" />

                            </span>
                        </div>

                        <div className="flex flex-wrap xl:w-[25vw] w-[50vw] h-[30vh] justify-center m-2 py-5 bg-white rounded-2xl shadow-2xl z-10 overflow-y-auto overflow-x-hidden">

                            <div>
                                <input
                                    type="text"
                                    className="w-11/12 mx-5 py-2 px-5 my-2 outline-none  bg-slate-200 rounded-2xl"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {countries.map((country) => {
                                    const code = getCode(country)?.toLowerCase()
                                    return (
                                        <div
                                            key={country}
                                            className="py-3 px-10 hover:bg-gray-100 hover:scale-105 flex items-center cursor-pointer duration-300"
                                            onClick={() => handleCountrySelection(country)}
                                        >
                                            {code &&
                                                <Image
                                                    height={32}
                                                    width={32}
                                                    alt={code}
                                                    src={`https://flagicons.lipis.dev/flags/4x3/${code}.svg`}
                                                    className="mr-5 rounded-md shadow-xl"
                                                />
                                            }
                                            {country}
                                        </div>
                                    );
                                })}
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}