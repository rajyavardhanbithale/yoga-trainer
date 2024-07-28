interface Props {
    title: string
    description: string
}

export default function Heading({ title, description }: Props) {
    return (
        <>
            <div className="flex flex-col">
                <span className="text-2xl p-5 text-slate-900 capitalize font-semibold">
                    {title}
                </span>
                <span className="text-xl px-5 text-slate-700 capitalize font-normal">
                    {description}
                </span>
            </div>
        </>
    )
}
