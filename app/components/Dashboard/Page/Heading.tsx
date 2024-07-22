interface Props {
    title: string
    description: string
}

export default function Heading({ title, description }: Props) {
    return (
        <>
            <div className="flex flex-col mx-5">
                <span className="text-3xl p-5 text-slate-900 capitalize font-semibold">
                    {title}
                </span>
                <span className="text-xl px-5 text-slate-700 capitalize font-normal">
                    {description}
                </span>
            </div>
        </>
    )
}
