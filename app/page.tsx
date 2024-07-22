import Navbar from './components/Home/Navbar'
import Header from './components/Home/Header'
import BackgroundSVG from './components/Home/Background'

export default function Home() {
    console.log('page ', process.browser)

    return (
        <main className="flex min-h-screen flex-col">
            <BackgroundSVG />
            <Navbar />
            <Header />
        </main>
    )
}
