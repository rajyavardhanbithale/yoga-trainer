import Link from 'next/link'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { TbBrandLeetcode } from 'react-icons/tb'

export default async function Footer() {
    const icons = [
        {
            name: 'github',
            icon: <FaGithub />,
            link: 'https://github.com/rajyavardhanbithale',
        },
        {
            name: 'linkedin',
            icon: <FaLinkedinIn />,
            link: 'https://www.linkedin.com/in/rajyavardhanb',
        },
        {
            name: 'twitter',
            icon: <FaXTwitter />,
            link: 'https://twitter.com/Saul08Goodman',
        },
        {
            name: 'leetcode',
            icon: <TbBrandLeetcode />,
            link: 'https://leetcode.com/rajyavardhanbithale',
        },
    ]

    return (
        <>
            <footer className="bg-slate-900 text-slate-100 py-4 px-6 flex flex-col sm:flex-row gap-6 items-center justify-between glass-card">
                <div className="flex items-center gap-2  px-4 py-2 rounded-lg">
                    <img
                        src="/home/logo.svg"
                        alt="RAGE AI Logo"
                        className="w-8"
                    />
                    <span className="text-2xl font-semibold">RAGE AI</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center sm:text-left tracking-wide">
                    <span className="text-lg font-normal">
                        Made with 🤯 by Rajyavardhan Bithale
                    </span>
                    <span className="text-sm font-normal">
                        © {new Date().getFullYear()} All Rights Reserved | RAGE
                    </span>
                </div>

                <div className="flex gap-4">
                    {icons.map((icon, idx) => (
                        <Link href={icon.link} key={idx} target="_blank">
                            <div className="text-2xl text-slate-100 flex items-center hover:brightness-75 transition duration-300 cursor-pointer">
                                {icon.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </footer>
        </>
    )
}
