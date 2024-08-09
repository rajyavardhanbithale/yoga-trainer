'use client'

import { AppDispatch, RootState } from '@/lib/store'
import { createClientBrowser } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { IoIosShareAlt } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';

import CryptoJS from 'crypto-js'
import { likeFoodPost } from '@/lib/store/user/profileSlice'
import Link from 'next/link'

export default function RecipePageSocials(props: { mealID: number }) {
    const [localLikes, setLocalLikes] = useState<number>(0)
    const [isUserLike, setIsUserLike] = useState<boolean>(false)
    const [totalViews, setTotalViews] = useState<number>(0)

    const [error, setError] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    const supabase = createClientBrowser()
    const fetchPostData = async (id: number) => {
        const { data, error } = await supabase
            .from('food-data')
            .select('likes,views')
            .eq('id', id)
            .single()

        if (error) {
            return error
        }
        if (!error) {
            setLocalLikes(data.likes)
            setTotalViews(data.views)
        }
    }

    const fetchUserLikes = async (id: number) => {
       
        const userID: string | null = Cookies.get('myCookieKey') ?? null


        const { data, error } = await supabase
            .from('user-db')
            .select('food_like')
            .eq('userID', userID)
            .single()

        const isLiked = data?.food_like.includes(props.mealID)

        if (error) {
            setError(true)
        }
        if (!error) {
            setIsUserLike(isLiked)
        }
    }

    const updateViews = async (id: number) => {
        const { data, error } = await supabase
            .from('food-data')
            .update({ views: totalViews + 1 })
            .eq('id', id)
    }

    useEffect(() => {
        fetchPostData(props.mealID)
        fetchUserLikes(props.mealID)
    }, [props?.mealID])

    useEffect(() => {
        if (totalViews !== 0) {
            updateViews(props.mealID)
        }
    }, [totalViews])

    const handleLikes = async (method: 'like' | 'unlike') => {
        if (method === 'like') {
            setIsUserLike(true)
            setLocalLikes((prev) => prev + 1)
        } else if (method === 'unlike') {
            setIsUserLike(false)
            setLocalLikes((prev) => prev - 1)
        }
        await dispatch(likeFoodPost({ id: props.mealID, method }))
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col gap-2">
                <span className="text-lg text-white font-semibold">
                    {!error &&
                        (isUserLike ? (
                            <FcLike
                                onClick={() => handleLikes('unlike')}
                                className="text-3xl mb-1"
                            />
                        ) : (
                            <FcLikePlaceholder
                                onClick={() => handleLikes('like')}
                                className="text-3xl mb-1"
                            />
                        ))}

                    {error && (
                        <Link href="/login">
                            <FcLikePlaceholder className="text-3xl mb-1" />
                        </Link>
                    )}
                </span>
                <span className="text-lg text-white font-semibold">
                    {localLikes}
                </span>
            </div>
            <div className="flex justify-center items-center flex-col gap-2">
                <IoEye className="text-slate-100 text-3xl hover:opacity-50 duration-500 cursor-pointer" />
                <span className="text-lg text-white font-semibold">
                    {totalViews + 1}
                </span>
            </div>
            <IoIosShareAlt className="text-slate-100 text-3xl hover:opacity-50 duration-500 cursor-pointer" />
        </>
    )
}
