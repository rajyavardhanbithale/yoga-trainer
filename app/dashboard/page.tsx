'use client'
import Sidebar from "../components/Dashboard/Page/Sidebar";
import Dashboard from "../components/Dashboard/Page/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { createClientBrowser } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import StatsDashboard from "../components/Dashboard/Stats/Stats";

export default function Page() {
    const [username, setUsername] = useState<string>('')

    const supabase = createClientBrowser()


    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUsername(user?.user_metadata?.name)
    }

    useEffect(() => {
        getUser()
    }, [])

    const activeWindow = useSelector((state: RootState) => state.dashboard.activeWindow)


    return (
        <>
            {/* <Calendar epochTimes={Time} /> */}

            <div className="flex bg-white">
                <Sidebar></Sidebar>
                <div className="flex-1 p-2 bg-slate-50 w-full">

                    {/* {activeWindow === 'dashboard' && <Dashboard name={username}></Dashboard>} */}
                    {activeWindow === 'stats' && <StatsDashboard></StatsDashboard>}
                </div>
            </div>


        </>
    )
}