'use client'

import { IoMdSettings } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateRepTime } from "@/lib/store/tensorflow/tensorflowSlice";

export default function Preferences(props: { open?: boolean, setOpen?: (value: boolean) => void }) {
    const [interval, setInterval] = useState<number>(3); // default value

    useEffect(() => {
        
        const storedRepTime = localStorage.getItem('repTime');
        if (storedRepTime) {
            setInterval(parseFloat(storedRepTime));
        }
    }, []);

    const [open, setOpen] = useState<boolean>(props.open ?? false);

    useEffect(() => {
        if (props.open !== undefined) {
            setOpen(props.open);
        }
    }, [props.open]);

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterval(Number(e.target.value));
    };

    const handleSaveChanges = () => {
        dispatch(updateRepTime(interval));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="p-1 bg-slate-200 rounded-xl cursor-pointer" onClick={() => setOpen(true)}>
                    <IoMdSettings className="text-2xl text-slate-800 hover:animate-spin animate-once animate-duration-[2000ms] animate-ease-in-out" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] z-[1000]">
                <DialogHeader>
                    <DialogTitle>Preferences</DialogTitle>
                    <DialogDescription className="font-bold mt-2">
                        Adjust how often we check your yoga pose based on how much memory your device has.
                        <br />
                        <span className="text-sm font-extrabold text-red-800">
                            If your device has low memory or is less powerful, please do not set the interval above 3 seconds.
                            Setting a higher interval might slow down your device or cause it to freeze during pose prediction.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="updateInterval" className="text-left">
                            Check Interval (in seconds)
                        </Label>
                        <Input
                            id="updateInterval"
                            type="number"
                            value={interval}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="Enter interval in seconds"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSaveChanges}
                        type="button">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
