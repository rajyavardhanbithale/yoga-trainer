import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchUserLike, likeFoodPost } from '@/lib/store/user/profileSlice'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { TiEye } from 'react-icons/ti'
import Link from 'next/link'

export default function DietUserLike(props: {
    mealId: number
    mealLike: number | undefined
    mealViews: number | undefined
}) {
    const userLikes =
        useSelector((state: RootState) => state.profileSlice.USERLIKE) || []
    const status = useSelector((state: RootState) => state.profileSlice.status)
    const dispatch = useDispatch<AppDispatch>()

    const [localLike, setLocalLike] = useState<boolean>(
        userLikes.includes(props.mealId)
    )
    const [localMealLike, setLocalMealLike] = useState<number>(
        props.mealLike ?? 0
    )
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false) // Added loading state

    useEffect(() => {
        dispatch(fetchUserLike())
    }, [dispatch])

    useEffect(() => {
        setLocalLike(userLikes.includes(props.mealId))
    }, [userLikes, props.mealId])

    const handleLikes = async (method: 'like' | 'unlike') => {
        if (loading) return // Prevent multiple simultaneous requests

        setLoading(true)
        const newLikeStatus = method === 'like'
        const newLikeCount =
            method === 'like' ? localMealLike + 1 : localMealLike - 1

        setLocalLike(newLikeStatus)
        setLocalMealLike(newLikeCount)
        setError(false)

        try {
            await dispatch(likeFoodPost({ id: props.mealId, method })).unwrap()
        } catch (error) {
            setLocalLike(!newLikeStatus)
            setLocalMealLike(
                method === 'like' ? localMealLike : localMealLike + 1
            )
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex gap-5">
                {status === 'success' ? (
                    <div className="cursor-pointer my-2 flex items-center align-middle gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-500">
                        {!error ? (
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
                        ) : (
                            <Link href="/login">
                                <FcLikePlaceholder className="text-3xl mb-1" />
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
                    <TiEye className="text-3xl mb-1 text-slate-800" />
                    <span className="txt-xl">{props?.mealViews ?? 0}</span>
                </div>
            </div>
        </>
    )
}
