'use client'
import Sidebar from '../components/Dashboard/Page/Sidebar'
import Dashboard from '../components/Dashboard/Page/Dashboard'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { createClientBrowser } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import StatsDashboard from '../components/Dashboard/Stats/Stats'
import Achievements from '../components/Dashboard/Achivements/Achievements'
import Profile from '../components/Dashboard/Profile/Profile'
import DietDashboard from '../components/Dashboard/Diet/Diet'

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
                    {/* {activeWindow === 'dashboard' && (
                        <Dashboard name={user?.user_metadata?.name}></Dashboard>
                    )} */}

                    {/* {activeWindow === 'stats' && (
                        <StatsDashboard></StatsDashboard>
                    )} */}

                    {/* {activeWindow === 'achievements' && (
                        <Achievements></Achievements>
                    )} */}

                    {activeWindow === 'diet' && <DietDashboard />}

                    {/* {user && activeWindow === 'profile' && (
                        <Profile user={user}></Profile>
                    )} */}
                </div>
            </div>
        </>
    )
}
