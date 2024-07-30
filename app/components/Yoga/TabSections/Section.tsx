'use client'

import { useSelector } from "react-redux"
import Benefits from "./Benefits"
import TabSwitcher from "./TabSwitcher"
import Tutorial from "./Tutorial"
import LineChart from "./Accuracy/AccuracyLineChart"
import AnalysisDoughnutChart from "./Analysis/AnalysisDoughnutChart"

export default function Information() {

    const activeTab = useSelector((state: any) => state.practiceSlice.currentTab)
    return (
        <>
            <TabSwitcher />

            {activeTab === 'benefits' && <Benefits />}
            {activeTab === 'tutorial' &&
                <div className="flex h-full -mt-5">
                    <Tutorial />
                </div>
            }

            {activeTab === 'accuracy' &&
                <div className="flex h-full w-full">
                    <LineChart />
                </div>
            }

            {activeTab === 'analysis' &&
                <div className="flex h-full w-full">
                    <AnalysisDoughnutChart />
                </div>
            }

        </>
    )
}