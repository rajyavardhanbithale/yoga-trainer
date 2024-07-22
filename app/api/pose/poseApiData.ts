import { YogaPoseAPI } from '@/types'

const pose: { [key: string]: string } = {
    '101': 'Tree Pose',
    '102': 'Warrior I',
    '103': 'Downward Facing Dog',
    '104': 'Goddess Pose',
    '105': 'Mountain Pose',
    '106': 'Warrior II',
}

const poseInfo: YogaPoseAPI[] = [
    {
        id: 101,
        name: 'tree pose',
        originalName: 'vṛkṣāsana',
        description:
            'The Tree Pose, Also Known As Vṛkṣāsana, Is A Yoga Pose That Helps To Improve Balance And Stretches The Body From Head To Toe',
        benefits: [
            'Balance Enhancement: Tree pose strengthens stabilizing muscles, improving equilibrium and stability for better posture and reduced risk of falls in daily activities.',
            'Leg Strength: Engaging quadriceps, hamstrings, and calves, tree pose builds lower body strength, enhancing functional abilities like walking and standing.',
            'Concentration: Requires focused attention on body alignment and breath, cultivating mindfulness that extends beyond the mat into daily tasks.',
            'Hip Flexibility: By stretching inner thighs and groin, tree pose promotes greater mobility in the hips, easing tension from sedentary lifestyles.',
            'Posture Alignment: Tree pose encourages spinal elongation and shoulder opening, fostering healthy posture habits for improved spinal alignment and reduced discomfort.',
        ],
        tutorial: 'tree.gif',
        image: 'tree.webp',
        TFData: {
            class: 'tree',
            set: 1,
        },
        audioData: {
            mainAudio: 'tree.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/Fr5kiIygm0c',
            tutorialIFRAME: 'https://www.youtube.com/embed/Fr5kiIygm0c',
            tutorialSource: 'yt',
        },
    },
    {
        id: 102,
        name: 'Warrior I',
        originalName: 'Vīrabhadrāsana I',
        description:
            'Warrior 1, also known as Virabhadrasana I, is a standing yoga pose that stretches the front of the body, improves balance, and builds strength in the core, legs, and back.',
        benefits: [
            'Strengthens Legs: Warrior 1 pose engages quadriceps, hamstrings, and calves, building lower body strength and stability.',
            'Improves Balance: Balancing on one leg, Warrior 1 enhances stability and coordination while fostering mental focus.',
            'Opens Hips: The hip of the back leg is in extension, stretching the hip flexors and promoting hip mobility.',
            'Stretches Chest and Shoulders: Extending the arms overhead in Warrior 1 stretches the chest and shoulders, counteracting the effects of hunching.',
            'Grounding and Empowerment: Rooting down through the feet, Warrior 1 promotes a sense of grounding and inner strength.',
        ],
        tutorial: 'warrior1.gif',
        image: 'warrior1.webp',
        TFData: {
            class: 'warrior1',
            set: 1,
        },
        audioData: {
            mainAudio: 'warrior1.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
                'seg5.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/NytDpa2r34g',
            tutorialIFRAME: 'https://www.youtube.com/embed/NytDpa2r34g',
            tutorialSource: 'yt',
        },
    },
    {
        id: 103,
        name: 'Downward Facing Dog',
        originalName: 'Adho Mukha Śvānāsana',
        description:
            'Downward facing Dog or Downward Dog is also known as Adho Mukha Śvānāsana, is an inversion asana, often practised as part of a flowing sequence of poses, especially Surya Namaskar, the Salute to the Sun',
        benefits: [
            'Full Body Stretch: Downward Dog lengthens the spine, hamstrings, and calves, providing a comprehensive stretch for the entire body.',
            'Strengthens Arms and Shoulders: Holding the body weight, Downward Dog strengthens the arms, shoulders, and upper back muscles.',
            'Improves Flexibility: Regular practice increases flexibility in the spine, shoulders, and hamstrings, enhancing overall mobility.',
            'Calms the Mind: The inversion in Downward Dog promotes relaxation and relieves stress, calming the mind and promoting mental clarity.',
            'Energy Boost: Downward Dog increases blood flow to the brain, refreshing the body and mind, and providing an energy boost.',
        ],
        tutorial: 'downdog.gif',
        image: 'downdog.webp',
        TFData: {
            class: 'downdog',
            set: 1,
        },
        audioData: {
            mainAudio: 'downdog.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
                'seg5.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/EC7RGJ975iM',
            tutorialIFRAME: 'https://www.youtube.com/embed/EC7RGJ975iM',
            tutorialSource: 'yt',
        },
    },
    {
        id: 104,
        name: 'Goddess Pose',
        originalName: 'Utkaṭāsana',
        description:
            'The Goddess pose, also known as Utkata Konasana, is a standing yoga pose that opens the hips and chest, tones the body, and stretches the inner thighs, hips, and pelvis',
        benefits: [
            'Strengthens Lower Body: Goddess pose engages the quadriceps, glutes, and inner thighs, building strength and stability in the lower body.',
            'Opens Hips and Chest: This wide-legged stance stretches the hips and groin while opening the chest and shoulders, promoting flexibility.',
            'Core Activation: By drawing the belly button in and engaging the core, Goddess pose strengthens the abdominal muscles and improves posture.',
            'Empowerment and Confidence: The powerful stance of Goddess pose fosters a sense of inner strength, confidence, and empowerment.',
            'Balancing Feminine Energy: Symbolizing the goddess archetype, this pose balances feminine energy, promoting self-love, nurturing, and grace.',
        ],
        tutorial: 'goddess.gif',
        image: 'goddess.webp',
        TFData: {
            class: 'goddess',
            set: 2,
        },
        audioData: {
            mainAudio: 'goddess.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
                'seg5.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/cekN3sdUNso',
            tutorialIFRAME: 'https://www.youtube.com/embed/cekN3sdUNso',
            tutorialSource: 'yt',
        },
    },
    {
        id: 105,
        name: 'Mountain Pose',
        originalName: 'Tāḍāsana',
        description:
            "Mountain pose, also known as tadasana, is a yoga pose that's considered the foundation of all standing poses.",
        benefits: [
            'Foundation Establishment: Mountain pose roots the feet into the ground, establishing a strong foundation and promoting stability.',
            'Posture Alignment: It encourages proper alignment of the spine, shoulders, and hips, fostering good posture habits.',
            "Mindfulness Cultivation: By bringing attention to the body's alignment and breath, Mountain pose cultivates mindfulness and presence.",
            'Energizing and Grounding: This pose simultaneously energizes and grounds, creating a sense of balance and centeredness.',
            'Preparation for Asanas: Mountain pose serves as a starting point for many yoga sequences, preparing the body and mind for further practice.',
        ],
        tutorial: 'mountain.gif',
        image: 'mountain.webp',
        TFData: {
            class: 'mountain',
            set: 2,
        },
        audioData: {
            mainAudio: 'mountain.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
                'seg5.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/0mPNlC0vD6s',
            tutorialIFRAME: 'https://www.youtube.com/embed/0mPNlC0vD6s',
            tutorialSource: 'yt',
        },
    },
    {
        id: 106,
        name: 'Warrior II',
        originalName: 'Vīrabhadrāsana II',
        description:
            'Warrior II pose also known as Vīrabhadrāsana II is the second of three related powerful standing postures that improve strength and flexibility.',
        benefits: [
            'Strengthens Legs and Core: Warrior 2 engages quadriceps, hamstrings, and core muscles, building strength and stability.',
            'Hip Opening: The extended stance stretches the hips and groin, promoting flexibility and mobility in the hip joints.',
            'Shoulder and Chest Expansion: Arms outstretched, Warrior 2 opens the chest and shoulders, countering the effects of hunching.',
            'Enhances Balance and Focus: Balancing on one leg, Warrior 2 improves balance and concentration, fostering mental focus.',
            'Warrior Spirit: Embodying strength and determination, Warrior 2 cultivates a sense of empowerment and resilience.',
        ],
        tutorial: 'warrior2.gif',
        image: 'warrior2.webp',
        TFData: {
            class: 'warrior2',
            set: 2,
        },
        audioData: {
            mainAudio: 'warrior2.mp3',
            benefits: 'benefits.mp3',
            narratorSegment: [
                'seg0.mp3',
                'seg1.mp3',
                'seg2.mp3',
                'seg3.mp3',
                'seg4.mp3',
                'seg4.mp3',
                'seg4.mp3',
            ],
        },
        videoData: {
            tutorialURL: 'https://youtu.be/Mn6RSIRCV3w',
            tutorialIFRAME: 'https://www.youtube.com/embed/Mn6RSIRCV3w',
            tutorialSource: 'yt',
        },
    },
]

// {
//     id: 105,
//     name: "",
//     originalName: "",
//     description: "",
//     benefits: [
//     ],
//     tutorial: "", // gif
//     image: "", // webp
//     TFData: {
//         class: "mountain", // cnn object class
//         set: 2, // model set number
//     },
//     audioData: { //mp3
//         mainAudio: "",
//         benefits: "",
//         narratorSegment: []
//     }
// },

export { pose, poseInfo }
