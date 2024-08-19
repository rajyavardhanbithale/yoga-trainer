import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Title } from "./StyleUtils"


export default function FAQ() {
    const faq = [
        {
            title: "What is RAGE AI?",
            description: "RAGE AI is an AI-powered yoga platform that provides real-time feedback on your yoga poses using deep learning technologies. Users perform yoga poses while their webcam feed is analyzed by our CNN model, which offers immediate corrections and tips to improve pose accuracy."
        },
        {
            title: "Who created RAGE AI?",
            description: "RAGE AI is a personal project created by Rajyavardhan Bithale, aiming to use AI technology to provide clear and accessible guidance for enhancing your yoga practice and many more."
        },
        {
            title: "How does the real-time feedback work?",
            description: "The platform uses TensorFlow and Keras to analyze images from your webcam in real-time. As you perform a pose, our CNN model evaluates your posture and provides immediate feedback through our narrator, helping you adjust and perfect your pose."
        },
        {
            title: "What technology is used in RAGE AI?",
            description: "RAGE AI is built with TensorFlow and Keras for deep learning, Next.js for server-side rendering, and Tailwind CSS for styling. TensorFlow.js is used to run the model directly in your browser, ensuring a responsive and interactive experience."
        },
        {
            title: "Are yoga sessions recorded?",
            description: "No, RAGE AI does not record yoga sessions. Your webcam feed is analyzed in real-time for feedback, but no data is stored or recorded."
        },
        {
            title: "Is RAGE AI suitable for beginners?",
            description: "Yes, RAGE AI is designed to be user-friendly and accessible for all levels, including beginners. The real-time feedback and tips are meant to guide users of all skill levels in improving their yoga practice."
        },
        {
            title: "Is there a subscription fee?",
            description: "RAGE AI is completely free to use. There are no subscription fees or hidden costs associated with accessing our yoga guidance features."
        },
    ]


    return (
        <>
            <div className="w-[80%] flex justify-center items-center mx-auto flex-col gap-10">

                <Title>
                    FAQs
                </Title>


                <Accordion type="multiple" className="w-full glass-card px-6 py-5">
                    {faq.map((item, idx) => (
                        <AccordionItem
                            key={idx}
                            value={`item-${idx}`}>
                            <AccordionTrigger className="text-slate-50 font-bold sm:text-lg text-start">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-50 sm:text-base">
                                {item.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </>
    )
}