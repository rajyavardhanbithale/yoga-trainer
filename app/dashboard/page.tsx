
import Sidebar from "../components/Dashboard/utils/Sidebar";
import Dashboard from "../components/Dashboard/utils/Dashboard";
import { createClient } from "@/utils/supabase/server";
export default async function Page() {
    // const [activeSection, setActiveSection] = useState<string>('dashboard')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const username = user?.user_metadata?.name


    
    return (
        <>
            {/* <Calendar epochTimes={Time} /> */}

            <div className="flex bg-white">
                <Sidebar></Sidebar>
                <div className="flex-1 p-2 bg-slate-50 w-full">
                    {username &&
                        <Dashboard name={username}></Dashboard>
                    }
                </div>
            </div>


        </>
    )
}