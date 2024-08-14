import NavbarDummy from "../components/Home/NavbarDummy"

export default function DietLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavbarDummy />
            <section>
                {children}
            </section>
        </>
    )
}