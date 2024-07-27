'use client'

import { useRouter } from 'next/navigation'

export default function DietTags(props: { mealTag: string }) {
    const tag = props?.mealTag

    const router = useRouter()

    const handleTagRemove = (tag: string) => {
        const currentUrl = new URL(window.location.href)
        const searchParams = new URLSearchParams(currentUrl.search)
        const overlay = searchParams.get('overlay') || null

        const tags = searchParams.get('tag')
        console.log(tags)

        if (tags) {
            const tagArray = tags.split(',')
            const updatedTagArray = tagArray.filter((tagT) => tagT !== tag)
            if (updatedTagArray.length > 0) {
                searchParams.set('tag', updatedTagArray.join(','))
            } else {
                searchParams.delete('tag')
            }
        } else {
            searchParams.delete('tag')
        }

        searchParams.set('overlay', 'true')
        const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`

        overlay ? router.replace(newUrl) : router.push(newUrl)
    }

    return (
        <>
            <div className="tooltip" data-tip="Click To Remove">
                <button
                    onClick={() => handleTagRemove(tag)}
                    className="text-lg bg-blue-900 text-slate-100 px-4 py-1 capitalize rounded-full relative group"
                >
                    {tag}
                </button>
            </div>
        </>
    )
}
