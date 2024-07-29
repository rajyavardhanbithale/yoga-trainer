'use client'
import Sidebar from '../components/Dashboard/Page/Sidebar'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { createClientBrowser } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import '@/app/components/Dashboard/Page/dashboard.css'
import Loading from '@/app/components/Dashboard/Loading'

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
            <div className="flex bg-slate-100">
                <Sidebar />
                <div className="mt-16 sm:ml-24 sm:m-2 h-full w-full bg-slate-50 rounded-2xl">
                  
                    {activeWindow === 'dashboard' && (
                        <Dashboard name={user?.user_metadata?.name}></Dashboard>
                    )}

                    {activeWindow === 'stats' && (
                        <StatsDashboard></StatsDashboard>
                    )}

                    {activeWindow === 'badges' && <Achievements></Achievements>}

                    {activeWindow === 'diet' && <DietDashboard />}

                    {user && activeWindow === 'profile' && (
                        <Profile user={user}></Profile>
                    )}
                </div>
            </div>
        </>
    )
}
