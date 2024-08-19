'use client'
import React from 'react'
import { ImStatsDots } from 'react-icons/im'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiBowlFoodLight } from 'react-icons/pi'
import { RiUser6Line } from 'react-icons/ri'
import { TbTrophy } from 'react-icons/tb'
import { Title } from './StyleUtils'
import { motion } from 'framer-motion'

const variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: [0, 1], opacity: [0, 1] },
    exit: { scale: [1, 0], opacity: [1, 0] },
}

export default function DashboardSection() {
    const dashboardItems = [
        {
            title: 'Dashboard',
            description:
                'View your yoga progress, upcoming sessions, and notifications in one place.',
            icon: <LuLayoutDashboard />,
        },
        {
            title: 'Stats',
            description:
                'Track your practice with detailed statistics and performance metrics.',
            icon: <ImStatsDots />,
        },
        {
            title: 'Badges',
            description:
                'Earn and showcase badges for milestones and challenges.',
            icon: <TbTrophy />,
        },
        {
            title: 'Diet',
            description:
                'Plan and monitor your diet to enhance your yoga practice.',
            icon: <PiBowlFoodLight />,
        },
        {
            title: 'Profile',
            description:
                'Explore your profile, edit your photo, country, and privacy settings.',
            icon: <RiUser6Line />,
        },
    ]

    return (
        <div className="px-4 md:px-8 text-gray-100 flex flex-col justify-center items-center">
            <Title>
                Personalize Your Experience with the RAGE AI Dashboard
            </Title>

            <div className="flex flex-wrap -mx-4 justify-center items-center mt-16 w-11/12">
                {dashboardItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6"
                    >
                        <DashboardCard item={item} index={idx} />
                    </div>
                ))}
            </div>
        </div>
    )
}

function DashboardCard({ item, index }: { item: any; index: number }) {
    return (
        <motion.div
            key={index}
            whileInView="visible"
            exit="exit"
            variants={variants}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
            }}
            viewport={{ once: false }}
            className="glass-card rounded-lg shadow-lg overflow-hidden"
        >
            <div className="hover:scale-105 duration-700">
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                    <div className="text-slate-50 text-3xl flex justify-center items-center w-full">
                        {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-slate-50 font-normal">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
