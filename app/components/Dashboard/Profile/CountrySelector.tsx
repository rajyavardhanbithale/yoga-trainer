import { useState } from 'react'
import { getNames, getCode } from 'country-list'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { IoPencilSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { updateCountry } from '@/lib/store/dashboard/userProfileSlice'
import toast, { Toaster } from 'react-hot-toast'

export default function CountrySelector(props: {
    isCountryAvailable: boolean
}) {
    const [open, setOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    function handleCountrySelection(country: string | null) {
        const code: string | null | undefined =
            country && getCode(country)?.toLowerCase()
        if (typeof code === 'string') {
            dispatch(updateCountry(code))
            setOpen(false)
        } else {
            toast.error('Error in updating country')
        }
    }

    const countries = getNames().filter((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex">
                    {!props.isCountryAvailable && (
                        <span className="mr-2 font-bold">Update Country</span>
                    )}
                    <IoPencilSharp className="text-xl mb-1 text-slate-700" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select your Country</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5 w-full h-[50vh] overflow-y-auto overflow-x-hidden">
                                <input
                                    type="text"
                                    className="w-11/12 mx-5 py-2 px-5 my-2 outline-none  bg-slate-200 rounded-2xl"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                {countries.map((country) => {
                                    const code = getCode(country)?.toLowerCase()
                                    return (
                                        <div
                                            key={country}
                                            className="py-3 px-10 hover:bg-gray-100 hover:scale-105 flex items-center cursor-pointer duration-300"
                                            onClick={() =>
                                                handleCountrySelection(country)
                                            }
                                        >
                                            {code && (
                                                <Image
                                                    height={32}
                                                    width={32}
                                                    alt={code}
                                                    src={`https://flagicons.lipis.dev/flags/4x3/${code}.svg`}
                                                    className="mr-5 rounded-md shadow-xl"
                                                />
                                            )}
                                            {country}
                                        </div>
                                    )
                                })}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
