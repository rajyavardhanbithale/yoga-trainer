'use client'

export default function TensorButton({
    onClick,
    label,
}: {
    onClick: () => void
    label: string
}) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-900 text-slate-50 font-semibold text-2xl h-fit 
py-2 px-6 rounded-tl-2xl rounded-br-2xl 
hover:rounded-tr-2xl hover:rounded-bl-2xl duration-500
hover:rounded-tl-none hover:rounded-br-none
shadow-xl hover:shadow-blue-800/50"
        >
            {label}
        </button>
    )
}
