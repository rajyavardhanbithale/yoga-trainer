'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LeaderboardStats from "../../LeaderBoard/LeaderboardStats";
import { motion } from 'framer-motion';

export default function LeaderBoardCard() {
    const [userInfo, setUserInfo] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`/api/leaderboard`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserInfo(data.metrics);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);



    return (
        <>
            <div className="flex flex-row justify-between w-3/4 mx-auto ">
                {!loading && userInfo.length !== 0 &&
                    userInfo.slice(0, 3).map((data: any, idx: number) => (
                        <motion.div
                            key={data.userInfo.user_public_id}
                            className={`w-64 h-fit p-4 glass-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center gap-4 
                                ${idx === 1 ? 'scale-50 z-10 order-0' :
                                    idx === 0 ? 'scale-110 order-1' :
                                        'scale-50 order-2'
                                }`}
                            initial={{ opacity: 0, x: idx === 0 ? 0 : idx === 1 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2, type: 'spring', stiffness: 100, delay: 0 }}
                            viewport={{ once: false }}
                        >
                            <div className="w-32 h-32 overflow-hidden rounded-full bg-gray-100 shadow-md">
                                <Image
                                    height={256}
                                    width={256}
                                    sizes="100vw"
                                    src={`/avatar/${data.userInfo.profile_pic.split('-')[0]}/${data.userInfo.profile_pic}.webp`}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <Image
                                    src={`/leaderboard/${idx + 1 === 1 ? 'gold' : idx + 1 === 2 ? 'silver' : 'bronze'}.png`}
                                    alt={idx + 1 === 1 ? 'gold' : idx + 1 === 2 ? 'silver' : 'bronze'}
                                    height={40}
                                    width={40}
                                    className="brightness-110"
                                />
                                {data.userInfo.country && (
                                    <div className="rounded-full overflow-hidden border-2 border-gray-300">
                                        <Image
                                            height={40}
                                            width={40}
                                            alt={data.userInfo.country}
                                            src={`https://flagicons.lipis.dev/flags/4x3/${data.userInfo.country}.svg`}
                                            className="shadow-md"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="text-xl font-bold text-slate-50 mt-2">
                                {data.userInfo.name}
                            </div>

                            <div className="w-full mt-2">
                                <LeaderboardStats
                                    accuracy={data.correctPoseMean}
                                    timeSpent={data.durationMean}
                                    session={data.totalSessions}
                                />
                            </div>
                        </motion.div>
                    ))}
            </div>

            {loading &&
                <div className="flex flex-row justify-between gap-4 p-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="w-64 h-96 p-4 bg-gray-200 rounded-lg shadow-lg animate-pulse flex flex-col items-center gap-4">
                            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                            <div className="w-32 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-full h-12 bg-gray-300 rounded-full"></div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}
