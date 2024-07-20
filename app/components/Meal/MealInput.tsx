'use client'

import { useRouter } from 'next/navigation';
import { useCallback } from "react";



export default function MealInput() {

    const router = useRouter();

    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedHandleURL = useCallback(debounce((value: string) => {
        router.push(`?search=${value}`);
    }, 1000), [router]);


    const handleURL = (e: any) => {
        e.preventDefault()
        debouncedHandleURL(e.target.value)

    }

    return (
        <>

            <div className="w-full flex justify-center items-center">
                <input
                    onChange={handleURL}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered outline-none w-full max-w-xs capitalize" />
            </div>

        </>
    )
}