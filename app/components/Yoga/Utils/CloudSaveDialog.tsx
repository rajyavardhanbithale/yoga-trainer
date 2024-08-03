'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { IoIosCloudDone } from 'react-icons/io'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useEffect } from 'react'
import { createClientBrowser } from '@/utils/supabase/client'

export default function CloudSaveDialog(props: {
    open: boolean
    setOpen: (value: boolean) => void
    startTensor: () => void
}) {
    const supabase = createClientBrowser()

    const checkUser = async () => {
        if (props.open) {
            const { data: user, error } = await supabase.auth.getUser()
            if (user && !error) {
                handleCloseDialog()
                window.localStorage.setItem('showSaveProgressDialog', 'false')
            }
        }
    }

    const handleDonTShowAgain = (checked: boolean) => {
        window.localStorage.setItem('showSaveProgressDialog', String(!checked))
    }

    const handleCloseDialog = () => {
        props?.setOpen(false)
        props?.startTensor()
    }

    useEffect(() => {
        checkUser()
    }, [props.open, props.setOpen])

    return (
        <>
            <Dialog open={props.open} onOpenChange={handleCloseDialog}>
                <DialogContent>
                    <DialogHeader className="flex items-center gap-3">
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                Save Your Progress
                                <IoIosCloudDone className="text-3xl inline-flex ml-3 mb-1 text-green-500" />
                            </DialogTitle>
                            <DialogDescription className="text-lg text-slate-600 mt-1">
                                To save your personalized yoga training data,
                                please log in to your account. If you prefer,
                                you can continue without logging in, but your
                                data won&apos;t be saved for future sessions.
                                Check the box below if you&apos;d like to skip
                                this prompt next time.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                            onCheckedChange={handleDonTShowAgain}
                            id="dont-show-again"
                        />
                        <label
                            htmlFor="dont-show-again"
                            className="text-sm font-medium text-slate-700"
                        >
                            Don&apos;t Show This Again
                        </label>
                    </div>

                    <DialogFooter className="flex justify-end gap-4 mt-6">
                        <Button
                            onClick={handleCloseDialog}
                            type="button"
                            className="bg-blue-900 hover:bg-blue-950 duration-700"
                        >
                            Continue Without Logging In
                        </Button>
                        <Link href={'/login'}>
                            <Button
                                type="button"
                                className="bg-blue-900 hover:bg-blue-950 duration-700"
                            >
                                Log In
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
