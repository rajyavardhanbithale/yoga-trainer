'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'
import confetti from 'canvas-confetti'

import { AchievementsData } from '@/app/api/achievements/achievementsData'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Button } from "@/components/ui/button"

export default function NewAchievements() {
    const [open, setOpen] = useState<boolean>(false)
    const [filteredAchievements, setFilteredAchievements] = useState<any[]>([])

    const gender = 'men'

    const updateState = useSelector(
        (state: RootState) => state.practiceSlice.updateStatus
    )

    const isModelRunning = useSelector(
        (state: RootState) => state.tensorflowSlice.isModelRunning
    )
    
    
    useEffect(() => {
        const fetchNewAchievements = async () => {
            try {
                const response = await axios.get('/api/unlock-achievement')
                const newAchievements = response.data as number[]

                const filtered = AchievementsData.filter((achievement) =>
                    newAchievements.includes(achievement.id)
                )
                if (newAchievements.length > 0) {
                    setOpen(true)
                }
                setFilteredAchievements(filtered)
            } catch (error) {
                console.error('Error fetching new achievements:', error)
            }
        }

        if (updateState === 'success' && !isModelRunning) {
            fetchNewAchievements()
        }
    }, [updateState,isModelRunning])

    useEffect(() => {
        if (open) {
            confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.5 },
                startVelocity: 25
            })
            confetti({
                particleCount: 250,
                spread: 220,
                origin: { y: 0.8 },
            })
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:min-w-[768px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        Congratulations on Your New Achievement! 🎉
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        You&apos;ve unlocked new achievements by reaching these
                        milestones. Keep up the great work and continue to
                        challenge yourself to earn more rewards!
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="w-full h-[50vh] sm:h-full flex">
                    <div className="flex flex-wrap gap-10 justify-center">
                        {filteredAchievements?.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="bg-slate-50 rounded-xl p-4 shadow-md flex flex-col items-center text-center relative hover:bg-slate-100 duration-700 hover:scale-105"
                            >
                                <Image
                                    height={128}
                                    width={128}
                                    src={`/achievements/${achievement.icon}-${gender}.webp`}
                                    alt={achievement.name}
                                    className="rounded-full mb-4"
                                />
                                <div className="flex flex-col items-center">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {achievement.name}
                                    </h3>
                                    <p className="text-gray-500 mb-2">
                                        {achievement.description}
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-sm ${achievement.rarity === 'Legendary' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-300 text-gray-600'}`}
                                    >
                                        {achievement.rarity}
                                    </span>
                                    <span className="block text-gray-500 mt-2 capitalize">
                                        Level: {achievement.level}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <DialogClose asChild>
                    <Button type="button">Close</Button>
                </DialogClose>
            </DialogContent>

        </Dialog>
    )
}
