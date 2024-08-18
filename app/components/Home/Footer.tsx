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
            <footer className="bg-blend-darken px-4 mt-5 flex flex-col sm:flex-row gap-5 items-center py-5 glass-card justify-evenly">
                <div className="flex items-center m-1 glass-card px-3 py-0.5">
                    <img src="/home/logo.svg" alt="" className="w-8" />
                    <span className="text-xl text-slate-100 px-1 m-1 font-normal">
                        RAGE AI
                    </span>
                </div>

                <div className="flex items-center m-1 glass-card px-3 py-0.5">
                    <span className="text-lg text-slate-100 px-1 m-1 font-normal">
                        © {new Date().getFullYear()} Made with 🤯 by
                        Rajyavardhan Bithale | All Rights Reserved
                    </span>
                </div>

                <div className="flex items-center m-1 glass-card px-3 py-2 gap-6">
                    {icons.map((icon, idx) => (
                        <Link href={icon.link} key={idx} target="_blank">
                            <div className="text-xl text-slate-100 flex items-center hover:brightness-50 duration-500 cursor-pointer">
                                {icon.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </footer>
        </>
    )
}
