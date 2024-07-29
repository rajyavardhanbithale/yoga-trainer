import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchUserLike, likeFoodPost } from '@/lib/store/user/profileSlice'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { TiEye } from 'react-icons/ti'
import Link from 'next/link'

interface Props {
    mealId: number;
    mealLike: number | undefined;
    mealViews: number | undefined;
}

export default function DietUserLike({ mealId, mealLike, mealViews }: Props) {

    const userLikes = useSelector((state: RootState) => state.profileSlice.USERLIKE) || [];
    const status = useSelector((state: RootState) => state.profileSlice.status);
    const priorError = useSelector((state: RootState) => state.profileSlice.PRIORERROR);
    const dispatch = useDispatch<AppDispatch>();

    const [localLike, setLocalLike] = useState<boolean>(userLikes.includes(mealId));
    const [localMealLike, setLocalMealLike] = useState<number>(mealLike ?? 0);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchUserLike());
    }, [dispatch]);

    useEffect(() => {
        setLocalLike(userLikes.includes(mealId));
    }, [userLikes, mealId]);

    const handleLikes = async (method: 'like' | 'unlike') => {
        setLoading(true);
        const newLikeStatus = method === 'like';
        const newLikeCount = method === 'like' ? localMealLike + 1 : localMealLike - 1;

        setLocalLike(newLikeStatus);
        setLocalMealLike(newLikeCount);
        setError(false);

        try {
            await dispatch(likeFoodPost({ id: mealId, method })).unwrap();
        } catch (error) {
            setLocalLike(!newLikeStatus);
            setLocalMealLike(method === 'like' ? localMealLike - 1 : localMealLike + 1);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (priorError === 'error') {
            setError(true);
        }
    }, [priorError]);

    return (
        <div className="flex gap-5">
            <div
                className={`cursor-pointer my-2 flex items-center gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-500 ${status === 'pending' || loading ? 'animate-pulse' : ''
                    }`}
            >
                {!error ? (
                    localLike ? (
                        <FcLike onClick={() => handleLikes('unlike')} className="text-3xl mb-1" />
                    ) : (
                        <FcLikePlaceholder onClick={() => handleLikes('like')} className="text-3xl mb-1" />
                    )
                ) : (
                    <Link href="/login">
                        <FcLikePlaceholder className="text-3xl mb-1" />
                    </Link>
                )}
                <span className="text-xl">{localMealLike}</span>
            </div>
            <div className="cursor-pointer my-2 flex items-center gap-2 bg-slate-100 w-fit px-2 py-1 rounded-xl hover:scale-110 duration-1000">
                <TiEye className="text-3xl mb-1 text-slate-800" />
                <span className="text-xl">{mealViews ?? 0}</span>
            </div>
        </div>
    );
};