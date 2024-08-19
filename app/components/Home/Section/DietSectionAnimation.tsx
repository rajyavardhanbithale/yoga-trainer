'use client'

import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { FiEye } from "react-icons/fi";
import { Comfortaa } from "next/font/google";
import { motion } from "framer-motion";

const comfortaa = Comfortaa({ subsets: ['latin'] });

interface Diet {
    id: number;
    name: string;
    image: string;
    likes: number;
    views: number;
}

interface DietSectionAnimationProps {
    diet: Diet;
    index: number;
}

const variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: [0, 1], opacity: [0, 1] },
    exit: { scale: [1, 0], opacity: [1, 0] }
};


export default function DietSectionAnimation({ diet, index }: DietSectionAnimationProps) {

    return (
        <motion.div
            key={index}
            whileInView="visible"
            exit="exit"
            variants={variants}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            viewport={{ once: false }}
            className="w-80 glass-card rounded-xl shadow-md flex flex-col p-4 gap-4"
        >
            <div className="w-full h-48 overflow-hidden rounded-lg">
                <img
                    src={`/meals/${diet.image}`}
                    alt={diet.name}
                    className="w-full h-full object-cover hover:scale-110 duration-1000"
                />
            </div>
            <h3 className="text-xl font-semibold text-center truncate text-slate-50">{diet.name}</h3>
            <div className={`${comfortaa.className} flex justify-between items-center text-lg text-slate-50 gap-3`}>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 ml-0.5">
                        <FcLike className="mb-1" />
                        <span>{diet.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                        <FiEye className="text-slate-500 mb-1 ml-0.5" />
                        <span>{diet.views}</span>
                    </div>
                </div>

                <div className="flex">
                    <Link href={`/diet/${diet.name.toLocaleLowerCase().replaceAll(' ', '-')}-${diet.id}`}>
                        <span className="glass-card px-3 py-1.5 hover:brightness-75 duration-700">
                            Read More
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
