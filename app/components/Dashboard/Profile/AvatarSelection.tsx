'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppDispatch } from '@/lib/store'
import { updateProfilePic } from '@/lib/store/dashboard/userProfileSlice'
import Image from 'next/image'
import { useState } from 'react'

import { MdModeEditOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'

export default function AvatarSelection() {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    const availableAvatarCategory = ['men', 'women', 'animal']
    const eachAvailableImage = 6
    const avatarFilenames: string[] = []

    availableAvatarCategory.forEach((category) => {
        for (let i = 1; i <= eachAvailableImage; i++) {
            avatarFilenames.push(`${category}/${category}-${i}.webp`)
        }
    })

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-3/4 xl:w-1/2 bg-blue-900 text-white px-4 py-2 font-medium rounded-2xl my-2 hover:brightness-90 duration-500 flex items-center justify-center">
                    Change
                    <MdModeEditOutline className="ml-2" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Select avatar for your profile
                        </DialogTitle>
                        <DialogDescription className="w-full">
                            <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
                                <div className="flex flex-wrap justify-center p-4">
                                    {avatarFilenames.map((filename, index) => (
                                        <div
                                            key={index}
                                            className="w-1/3 sm:w-1/3 p-2"
                                        >
                                            <div
                                                onClick={() => setOpen(false)}
                                                className="relative w-full h-0 pb-[100%]"
                                            >
                                                <Image
                                                    height={0}
                                                    width={0}
                                                    sizes="100wv"
                                                    src={`/avatar/${filename}`}
                                                    onClick={() =>
                                                        dispatch(
                                                            updateProfilePic(
                                                                filename
                                                                    .split('/')[1]
                                                                    .split('.')[0]
                                                            )
                                                        )
                                                    }
                                                    alt="Avatar"
                                                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
