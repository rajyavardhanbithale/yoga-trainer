import Image from "next/image";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ProfilePicMenu(props: any) {
    const [closed, setClosed] = useState<boolean>(true)

    const availableAvatarCategory = ['men', 'women', 'animal']
    const eachAvailableImage = 6
    const avatarFilenames: string[] = []



    availableAvatarCategory.forEach(category => {
        for (let i = 1; i <= eachAvailableImage; i++) {
            avatarFilenames.push(`${category}/${category}-${i}.webp`);
        }
    });

    function handleAvatarSelection(item: string | null) {
        if (typeof item === 'string') {
            const operation: (string | null) = item.split('/')[1].split('.')[0] || null
            props?.setUserDetails({ ...props?.userDetails, avatar: operation })
            props?.updateAvatar(operation)
        }
        setTimeout(() => {
            props?.setUserDetails({ ...props?.userDetails, popUpID: null })
        }, 500)
        setClosed(false)
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="p-8 rounded-md z-10">
                    <div className={`xl:w-1/2 h-auto flex flex-col mx-auto ${closed ? "animate-jump-in" : "animate-jump-out"}`}>
                        <div className="flex gap-4">
                            <span className="w-[90%] text-3xl font-bold mb-2 text-slate-800 bg-white m-2 px-4 py-3 rounded-2xl">
                                Choose Avatar
                            </span>

                            <span className="w-[10%] flex justify-center items-center text-3xl font-bold mb-2 text-slate-900 bg-white m-2 px-4 py-3 rounded-2xl">
                                <IoIosCloseCircleOutline
                                    onClick={() => handleAvatarSelection(null)}
                                    className="cursor-pointer hover:scale-105 duration-500 shadow-2xl" />

                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center m-2 py-5 bg-white rounded-2xl shadow-2xl">
                            {avatarFilenames && avatarFilenames.map((item, key) => (
                                <div key={key} className="flex w-[15%] p-2 m-1 cursor-pointer overflow-hidden">
                                    <img
                                        src={`/avatar/${item}`}
                                        onClick={() => handleAvatarSelection(item)}
                                        alt="avatar"
                                        className="w-32 h-32 object-cover object-top rounded-xl shadow-lg transition-transform  hover:scale-110 duration-700"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}