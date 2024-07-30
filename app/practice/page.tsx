'use client'


import YogaSidebar from "../components/Yoga/Page/Sidebar"
import UserSection from "../components/Yoga/Page/UserSection"


export default function Practice() {
    return (
        <div className="h-screen w-screen bg-slate-50 overflow-x-hidden">

            <div className="hidden xl:block">
                <YogaSidebar />
            </div>
            <div className="xl:ml-60 m-3">

                <UserSection />
            </div>
        </div>
    )
}