'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IoLogOutOutline } from 'react-icons/io5'
import { createClientBrowser } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Logout() {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)

    const handleConfirm = async () => {
        const supabase = createClientBrowser()

        const { error } = await supabase.auth.signOut()

        if (!error) {
            router.push('/')
        }
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex gap-3">
                    <span className="text-2xl font-extrabold text-slate-100">
                        <IoLogOutOutline />
                    </span>
                    <span className="sm:hidden text-xl text-slate-50 font-bold">
                        Logout
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="z-[130] w-[300px]">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    <DialogDescription>
                        Logging out will end your current session and you will
                        need to log in again to access your account.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-10">
                    <Button onClick={handleConfirm} variant="destructive">
                        Confirm
                    </Button>
                    <Button onClick={handleCancel} variant="secondary">
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
