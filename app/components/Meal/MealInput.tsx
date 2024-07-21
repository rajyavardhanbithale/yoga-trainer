'use client'

import { useRouter, useSearchParams } from 'next/navigation';
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
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        const overlay = searchParams.get('overlay') || null

        searchParams.set('overlay', 'true');
        searchParams.set('search', value);

        const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;

        if (overlay) {
            router.replace(newUrl);
        } else {
            router.push(newUrl);

        }
    }, 1000), [router]);


    const handleURL = (e: any) => {
        e.preventDefault()
        debouncedHandleURL(e.target.value)

    }


    return (
        <>

            <div className="w-full flex justify-center items-center mx-5">
                <input
                    onChange={handleURL}
                    type="text"
                    placeholder="Search here"
                    // value={searchParams.get('search') || ''}
                    className="outline-none w-full max-w-xs capitalize border-2 py-2 px-4 rounded-full" />
            </div>

        </>
    )
}