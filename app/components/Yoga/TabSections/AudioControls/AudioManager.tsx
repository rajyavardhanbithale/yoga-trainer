'use client'

import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const playbackSpeedMap: { [key: string]: number } = {
    slower: 0.5,
    slow: 0.75,
    fine: 1,
    fast: 1.25,
    fastest: 1.5,
}
const ambientMusicMap: { [key: string]: string } = {
    ambient: 'ambient.mp3',
    'forest 1': 'forest-1.mp3',
    'forest river 1': 'forest-river.mp3',
    'forest river 2': 'forest-with-river.mp3',
}

export default function AudioManager() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [audioIndex, setAudioIndex] = useState<number>(0)

    const audioData = useSelector(
        (state: RootState) => state.audioSlice.audioData
    )
    const audioState = useSelector(
        (state: RootState) => state.audioSlice.audioState
    )
    const audioSpeed = useSelector(
        (state: RootState) => state.audioSlice.audioSpeed
    )
    const volume = useSelector((state: RootState) => state.audioSlice.volume)
    const ambientMusic = useSelector(
        (state: RootState) => state.audioSlice.ambientMusic
    )
    const ambientMusicName = useSelector(
        (state: RootState) => state.audioSlice.ambientMusicName
    )

    const audioFiles = `/pose/audio/${audioData?.audioName}`
    const userAudioFiles = `/pose/audio/user`

    const playAudio = (newAudioURL: string) => {
        if (audio) {
            audio.pause()
            audio.src = ''
            setAudio(null)
        }

        const newAudio = new Audio(newAudioURL)
        newAudio.play()
        newAudio.volume = volume / 100
        newAudio.playbackRate = playbackSpeedMap[audioSpeed]
        setAudio(newAudio)
    }

    const handleAudioEnd = () => {
        if (audioState === 'tips' && audioData?.narratorSegment) {
            const nextIndex =
                (audioIndex + 1) % audioData.narratorSegment.length
            setAudioIndex(nextIndex)
            playAudio(`${audioFiles}/${audioData.narratorSegment[nextIndex]}`)
        } else {
            setAudio(null)
        }
    }

    const updateVolume = (volume: number) => {
        if (audio) {
            audio.volume = volume / 100
        }
    }

    const updatePlaybackSpeed = (speed: string) => {
        if (audio) {
            audio.playbackRate = playbackSpeedMap[speed]
        }
    }

    useEffect(() => {
        switch (audioState) {
            case 'benefits':
                if (audioData?.benefits) {
                    playAudio(`${audioFiles}/${audioData.benefits}`)
                }
                break

            case 'narrator':
                if (audioData?.mainAudio) {
                    playAudio(`${audioFiles}/${audioData.mainAudio}`)
                }
                break

            case 'tips':
                if (
                    audioData?.narratorSegment &&
                    audioData.narratorSegment.length > 0
                ) {
                    const randomIndex = Math.floor(
                        Math.random() * audioData.narratorSegment.length
                    )
                    setAudioIndex(randomIndex)
                    playAudio(
                        `${audioFiles}/${audioData.narratorSegment[randomIndex]}`
                    )
                }
                break

            case 'ambient':
                const ambientMusicNameT =
                    ambientMusicMap[ambientMusicName!] || 'ambient.mp3'
                if (ambientMusic) {
                    playAudio(
                        `${userAudioFiles}/background/${ambientMusicNameT}`
                    )
                } else {
                    if (audio) {
                        audio.pause()
                        audio.src = ''
                        setAudio(null)
                    }
                }
                break

            case null:
                if (audio) {
                    audio.pause()
                    audio.src = ''
                    setAudio(null)
                }
                break

            default:
                break
        }
    }, [audioState, ambientMusic, ambientMusicName])

    useEffect(() => {
        updateVolume(volume)
    }, [volume])

    useEffect(() => {
        updatePlaybackSpeed(audioSpeed)
    }, [audioSpeed])

    useEffect(() => {
        if (audio) {
            audio.onended = handleAudioEnd
        }
        return () => {
            if (audio) {
                audio.onended = null
            }
        }
    }, [audio])

    return <></>
}
