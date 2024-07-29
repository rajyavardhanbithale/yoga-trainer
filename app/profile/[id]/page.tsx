import Image from 'next/image'
import { getName } from 'country-list'
import { createClient } from '@/utils/supabase/server'
import { AchievementsData } from '@/app/api/achievements/achievementsData'
import Link from 'next/link'

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

export default async function Profile({ params }: any) {
    const searchParam = params.id

    const joinedTime = (time: number) => {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        const jTime = new Date(time)
        const date = jTime.getDate()
        const year = jTime.getFullYear()
        const month = jTime.getMonth()
        const monthName = monthNames[month]
        return `${date} ${monthName} ${year}`
    }

    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from(USERDB)
        .select('*')
        .eq('user_public_id', searchParam)
        .single()

    const achievement =
        data?.achievements &&
        AchievementsData.filter(
            (item) => data.achievements.includes(item.id) || null
        )

    const gender = 'men'

    return (
        <>
            {data?.profile_type === 'public' && (
                <div className="h-screen flex justify-center items-center bg-gray-50">
                    <div className="grid bg-white w-11/12 sm:w-3/4 xl:w-1/2 grid-cols-1 md:grid-cols-6 p-6 rounded-2xl shadow-xl">
                        <div className="md:col-span-2 flex flex-col justify-center items-center md:items-start w-full overflow-hidden">
                            <div className="m-4 w-full sm:w-full h-72 overflow-hidden rounded-xl shadow-2xl mx-auto">
                                <img
                                    src={`/avatar/${data.profile_pic.split('-')[0]}/${data.profile_pic}.webp`}
                                    alt="avatar"
                                    className="w-full h-full object-cover rounded-xl shadow-2xl transition-transform hover:scale-110 duration-700"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col justify-center sm:items-start items-center m-5 gap-3">
                            <div className="flex flex-col">
                                <span className="text-4xl font-semibold text-gray-800">
                                    {data.name}
                                </span>
                                <span className="text-sm font-semibold text-gray-600">
                                    #{data.user_public_id}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Image
                                    height={24}
                                    width={24}
                                    className="mr-2 rounded-md shadow-xl brightness-95"
                                    src={`https://flagicons.lipis.dev/flags/4x3/${data.country}.svg`}
                                    alt=""
                                />
                                <span className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 duration-500">
                                    {getName(data.country)}
                                </span>
                            </div>

                            <span className="text-gray-800">
                                Member since {joinedTime(data.created_at)}
                            </span>

                            <div className="flex flex-wrap w-full justify-center sm:justify-start">
                                {achievement &&
                                    achievement.map(
                                        (item: any, key: number) => (
                                            <div
                                                key={key}
                                                className="overflow-hidden m-2 rounded-full cursor-pointer flex items-center justify-center"
                                            >
                                                <Image
                                                    src={`/achievements/${item.icon}-${gender}.jpg`}
                                                    width={92}
                                                    height={92}
                                                    alt="Achievement"
                                                    className="rounded-full object-cover shadow-lg brightness-100 hover:scale-105 hover:brightness-105 hover:shadow-2xl duration-500"
                                                />
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(!data || data?.profile_type === 'private') && (
                <div className="h-screen flex justify-center items-center bg-gray-50">
                    <div className="flex flex-col gap-10 justify-center items-center bg-white w-11/12 sm:w-3/4 xl:w-1/3 p-6 rounded-2xl shadow-xl">
                        <img
                            src="https://img.icons8.com/pulsar-gradient/96/user-not-found.png"
                            alt="no-user-found"
                            className="w-24"
                        />
                        <span className="text-2xl text-center font-semibold">
                            No user found with the tag{' '}
                            {`#${searchParam || null}`}
                        </span>
                        <Link href={'/'}>
                            <button className="text-xl bg-blue-900 text-slate-50 px-6 py-2 rounded-2xl font-bold  hover:bg-blue-800 duration-700 transition-all">
                                Home
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
