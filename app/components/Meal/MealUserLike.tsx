'use client'

import { AppDispatch, RootState } from '@/lib/store'
import { fetchUserLike, likeFoodPost } from '@/lib/store/user/profileSlice'
import { useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'

export default function MealUserLike(props: {
    mealId: number
    mealLike: number | undefined
}) {
    const userLikes =
        useSelector((state: RootState) => state.profileSlice.USERLIKE) ?? []
    const status = useSelector((state: RootState) => state.profileSlice.status)
    const dispatch = useDispatch<AppDispatch>()

    const [localLike, setLocalLike] = useState<boolean>(
        userLikes.includes(props.mealId)
    )
    const [localMealLike, setLocalMealLike] = useState<number>(
        props.mealLike ?? 0
    )

    useEffect(() => {
        dispatch(fetchUserLike())
    }, [dispatch, props.mealId])

    useEffect(() => {
        setLocalLike(userLikes.includes(props.mealId))
    }, [userLikes, props.mealId])

    const handleLikes = async (method: 'like' | 'unlike') => {
        if (method === 'like') {
            setLocalLike(true)
            setLocalMealLike((prev) => prev + 1)
        } else if (method === 'unlike') {
            setLocalLike(false)
            setLocalMealLike((prev) => prev - 1)
        }

        await dispatch(likeFoodPost({ id: props.mealId, method }))
    }

    return (
        <>
            {status === 'success' ? (
                <div className="cursor-pointer my-2 flex items-center align-middle gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-500">
                    {localLike ? (
                        <FcLike
                            onClick={() => handleLikes('unlike')}
                            className="text-3xl mb-1"
                        />
                    ) : (
                        <FcLikePlaceholder
                            onClick={() => handleLikes('like')}
                            className="text-3xl mb-1"
                        />
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
        </>
    )
}
