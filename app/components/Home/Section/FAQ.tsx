

import { ScrollArea } from "@/components/ui/scroll-area"
import { Title } from './StyleUtils'

export default function FAQ() {
    const faq = [
        {
            title: 'What is RAGE AI?',
            description:
                'RAGE AI is an AI-powered yoga platform that provides real-time feedback on your yoga poses using deep learning technologies. Users perform yoga poses while their webcam feed is analyzed by our CNN model, which offers immediate corrections and tips to improve pose accuracy.',
        },
        {
            title: 'Who created RAGE AI?',
            description:
                'RAGE AI is a personal project created by Rajyavardhan Bithale, aiming to use AI technology to provide clear and accessible guidance for enhancing your yoga practice and many more.',
        },
        {
            title: 'How does the real-time feedback work?',
            description:
                'The platform uses TensorFlow and Keras to analyze images from your webcam in real-time. As you perform a pose, our CNN model evaluates your posture and provides immediate feedback through our narrator, helping you adjust and perfect your pose.',
        },
        {
            title: 'What technology is used in RAGE AI?',
            description:
                'RAGE AI is built with TensorFlow and Keras for deep learning, Next.js for server-side rendering, and Tailwind CSS for styling. TensorFlow.js is used to run the model directly in your browser, ensuring a responsive and interactive experience.',
        },
        {
            title: 'Are yoga sessions recorded?',
            description:
                'No, RAGE AI does not record yoga sessions. Your webcam feed is analyzed in real-time for feedback, but no data is stored or recorded.',
        },
        {
            title: 'Is RAGE AI suitable for beginners?',
            description:
                'Yes, RAGE AI is designed to be user-friendly and accessible for all levels, including beginners. The real-time feedback and tips are meant to guide users of all skill levels in improving their yoga practice.',
        },
        {
            title: 'Is there a subscription fee?',
            description:
                'RAGE AI is completely free to use. There are no subscription fees or hidden costs associated with accessing our yoga guidance features.',
        },
    ]

    return (
        <>
            <div className="flex justify-center items-center mx-auto flex-col gap-10">
                <Title>FAQs</Title>


                <div className="w-[80%] join join-vertical ">
                    {faq.map((item, idx) => (
                        <div
                            className="collapse join-item mb-4 collapse-arrow glass-card rounded-lg"
                            key={idx}
                        >
                            <input
                                type="radio"
                                name="accordion"
                                id={`accordion-${idx}`}
                                defaultChecked={idx === 0}
                            />
                            <label
                                htmlFor={`accordion-${idx}`}
                                className="collapse-title text-xl font-medium text-slate-50"
                            >
                                {item.title}
                            </label>
                            <div className="collapse-content px-4 py-1">
                                <p className="text-slate-50">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
