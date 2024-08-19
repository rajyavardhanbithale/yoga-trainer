import BackgroundSVG from '../components/Home/Background'

export default function Loading() {
    return (
        <>
            <main className="flex min-h-screen flex-col overflow-hidden">
                <BackgroundSVG />

                <div className="z-50 h-full flex flex-col gap-20 justify-center my-auto p-5 items-center scale-110">
                    <span className="loader-3s"></span>
                    <span className="loading-text">Load&nbsp;ng</span>
                </div>
            </main>
        </>
    )
}
