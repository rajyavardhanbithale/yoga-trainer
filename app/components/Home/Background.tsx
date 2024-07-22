import Image from 'next/image'

export default function BackgroundSVG() {
    return (
        <>
            {/* <img src="/home/bg.svg" alt="" className="xl:flex inset-0 w-full h-full object-cover hidden absolute z-0" /> */}
            {/* <img src="/home/bg-md.svg" alt="" className="absolute inset-0 w-full h-full object-cover z-0 xl:hidden" /> */}
            <Image
                src={'/home/bg.svg'}
                width={0}
                height={0}
                sizes="100vw"
                alt="BG-IMAGE"
                className="xl:flex inset-0 w-full h-full object-cover hidden absolute z-0"
            />

            <Image
                src={'/home/bg-md.svg'}
                width={0}
                height={0}
                sizes="100vw"
                alt="BG-IMAGE"
                className="absolute inset-0 w-full h-full object-cover z-0 xl:hidden"
            />
        </>
    )
}
