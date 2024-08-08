'use client'

import { useSelector } from 'react-redux'

import TabSwitcher from './TabSwitcher'
import AudioManager from './AudioControls/AudioManager'
import dynamic from 'next/dynamic'
import Loading from '../../Dashboard/Loading'

const Benefits = dynamic(
    () => import('@/app/components/Yoga/TabSections/Benefits'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)

const Tutorial = dynamic(
    () => import('@/app/components/Yoga/TabSections/Tutorial'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)

const AudioControl = dynamic(
    () =>
        import('@/app/components/Yoga/TabSections/AudioControls/AudioControl'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)
const AnalysisDoughnutChart = dynamic(
    () =>
        import(
            '@/app/components/Yoga/TabSections/Analysis/AnalysisDoughnutChart'
        ),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)


const LineChart = dynamic(
    () =>
        import('@/app/components/Yoga/TabSections/Accuracy/AccuracyLineChart'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)

export default function UserSectionExtras() {
    const activeTab = useSelector(
        (state: any) => state.practiceSlice.currentTab
    )
    return (
        <>
            <TabSwitcher />

            <div className="sm:w-full">
                {activeTab === 'benefits' && (
                    <div className="mt-5 sm:mt-1">
                        <Benefits />
                    </div>
                )}

                {activeTab === 'tutorial' && (
                    <div className="flex h-full  mt-16">
                        <Tutorial />
                    </div>
                )}

                {activeTab === 'accuracy' && (
                    <div className="flex h-full w-full">
                        <LineChart />
                    </div>
                )}

                {activeTab === 'analysis' && (
                    <div className="flex h-full w-full">
                        <AnalysisDoughnutChart />
                    </div>
                )}

                {activeTab === 'audio' && (
                    <div className="flex h-full w-full">
                        <AudioControl />
                    </div>
                )}
            </div>
            <AudioManager />
        </>
    )
}
