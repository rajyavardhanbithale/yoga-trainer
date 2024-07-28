'use client'

import { AppDispatch, RootState } from '@/lib/store'
import { fetchUserLike, likeFoodPost } from '@/lib/store/user/profileSlice'
import { use, useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { TiEye } from "react-icons/ti";
import Link from "next/link"

export default function DietUserLike(props: {
    mealId: number
    mealLike: number | undefined
    mealViews: number | undefined

}) {
    const userLikes = useSelector((state: RootState) => state.profileSlice.USERLIKE) ?? null
    const status = useSelector((state: RootState) => state.profileSlice.status)
    const dispatch = useDispatch<AppDispatch>()

    const [localLike, setLocalLike] = useState<boolean>(Array.isArray(userLikes) && userLikes.includes(props.mealId))
    const [localMealLike, setLocalMealLike] = useState<number>(props.mealLike ?? 0)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchUserLike())
    }, [])

    useEffect(() => {
        setLocalLike(Array.isArray(userLikes) && userLikes.includes(props.mealId))
    }, [userLikes, props.mealId])

    const handleLikes = async (method: 'like' | 'unlike') => {
        if (method === 'like') {
            setLocalLike(true)
            setLocalMealLike(prev => prev + 1)
        } else if (method === 'unlike') {
            setLocalLike(false)
            setLocalMealLike(prev => prev - 1)
        }
        try {
            await dispatch(likeFoodPost({ id: props.mealId, method })).unwrap()
        } catch (error) {

            if (method === 'like') {
                setLocalLike(false)
                setLocalMealLike(prev => prev - 1)
            } else if (method === 'unlike') {
                setLocalLike(true)
                setLocalMealLike(prev => prev + 1)
            }
        }
    }

    useEffect(() => {
        if (userLikes === null) {
            setError(true)
        }
    }, [status])

    return (
        <>
            <div className="flex gap-5">
                {status === 'success' ? (
                    <div className="cursor-pointer my-2 flex items-center align-middle gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-500">
                        {!error && (
                            localLike ? (
                                <FcLike
                                    onClick={() => handleLikes('unlike')}
                                    className="text-3xl mb-1"
                                />
                            ) : (
                                <FcLikePlaceholder
                                    onClick={() => handleLikes('like')}
                                    className="text-3xl mb-1"
                                />
                            )
                        )}

                        {error && (
                            <Link
                                href={'/login'}
                            >
                                <FcLikePlaceholder
                                    onClick={() => handleLikes('like')}
                                    className="text-3xl mb-1"
                                />
                            </Link>
                        )}

                        <span className="txt-xl">{localMealLike}</span>
                    </div>
                ) : (
                    <div className="cursor-pointer my-2 flex items-center align-middle gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 animate-pulse duration-1000">
                        {localLike ? (
                            <FcLike className="text-3xl mb-1" />
                        ) : (
                            <FcLikePlaceholder className="text-3xl mb-1" />
                        )}

                        <span className="txt-xl">{localMealLike}</span>
                    </div>
                )}

                <div className="cursor-pointer my-2 flex items-center align-middle gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-1000">
                    <TiEye

                        className="text-3xl mb-1 text-slate-800"
                    />
                    <span className="txt-xl">{props?.mealViews ?? 0}</span>
                </div>
            </div>

        </>
    )
}
