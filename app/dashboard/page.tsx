'use client'
import Sidebar from '../components/Dashboard/Page/Sidebar'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { createClientBrowser } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import '@/app/components/Dashboard/Page/dashboard.css'
import Loading from '../components/Dashboard/Loading'

const Dashboard = dynamic(
    () => import('@/app/components/Dashboard/Page/Dashboard'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)
const StatsDashboard = dynamic(
    () => import('@/app/components/Dashboard/Stats/Stats'),
    {
        loading: () => <Loading />,
        ssr: false,
    }
)
const Achievements = dynamic(
    () => import('@/app/components/Dashboard/Achievements/Achievements'),
    {
        loading: () => <Loading />,
        ssr: false,
    }
)
const DietDashboard = dynamic(
    () => import('@/app/components/Dashboard/Diet/Diet'),
    {
        loading: () => <Loading />,
        ssr: false,
    }
)
const Profile = dynamic(
    () => import('@/app/components/Dashboard/Profile/Profile'),
    {
        loading: () => <Loading />,
        ssr: false,
    }
)

export default function Page() {
    const [user, setUser] = useState<any>(null)

    const supabase = createClientBrowser()

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    const activeWindow = useSelector(
        (state: RootState) => state.dashboard.activeWindow
    )

    return (
        <>
            {/* <Calendar epochTimes={Time} /> */}
            <div className="flex bg-white">
                <Sidebar></Sidebar>
                <div className="flex-1 p-2 bg-slate-50 w-full mt-14 sm:mt-2">
                    {activeWindow === 'dashboard' && (
                        <Dashboard name={user?.user_metadata?.name}></Dashboard>
                    )}
                    {activeWindow === 'stats' && (
                        <StatsDashboard></StatsDashboard>
                    )}

                    {activeWindow === 'achievements' && (
                        <Achievements></Achievements>
                    )}

                    {activeWindow === 'diet' && <DietDashboard />}

                    {user && activeWindow === 'profile' && (
                        <Profile user={user}></Profile>
                    )}
                </div>
            </div>
        </>
    )
}
