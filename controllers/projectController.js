exports.getProjects = (req, res) => {
    const projects = [
        {
            title: "IoT Dashboard",
            description: "Real-time Monitoring using ESP32",
            mediaType: "video",
            mediaUrl: "/assets/realTimeMonitoring.mp4",
            githubUrl: "https:/url/"
        },
        {
            title: "AI Baseball Analysis",
            description: "An AI powered baseball swing analysis to determine batter accuracies.",
            mediaType: "video",
            mediaUrl: "/assets/BaseballAI.mp4",
            githubUrl: "https:/url/"
        },
        {
            title: "Gesture Controlled Patient Bed",
            description: "A gesture controlled bed for patient care- criticall ill and elderly. The project utilizes motion sensors such as the MPU6050 which is enclosed in a hand wearable, this augmented with an aligorithm reads hands movements to map them into a defined bed movement.",
            mediaType: "image",
            mediaUrl: "/assets/patientBed.jpg",
            githubUrl: "https:/url/"
        },
        {
            title: "Arduino-Based HeartRate Monitor",
            description: "A device built with the arduino uno MCU and the MAX-30102+ Red & Infared pair for measuring blood oxygen saturation and heart rate.",
            mediaType: "image",
            mediaUrl: "/assets/heartRateMeter.jpg",
            githubUrl: "https:/url/"
        },
        {
            title: "Smart Home Lighting System",
            description: "A web controlled home lighting system using esp8266. The lights can be turn on/off remotely from a web app.",
            mediaType: "image",
            mediaUrl: "/assets/HomeLighting.jpg",
            githubUrl: "https:/url/"
        },
        {
            title: "ContactLess Patient Monitoring System",
            description: "A contactless monitoring system based on radar and ultrasonic technology to monitor physiological parameters in patient.",
            mediaType: "image",
            mediaUrl: "/assets/ContactLess.jpg",
            githubUrl: "https:/url/"
        },
        {
            title: "Work Samples",
            description: "Circuit Building and Prototyping.",
            mediaType: "image",
            mediaUrl: "/assets/Circuits.jpg",
            githubUrl: "https:/url/"
        },
        {
            title: "Work Samples",
            description: "Circuit Building and Prototyping",
            mediaType: "image",
            mediaUrl: "/assets/Circuits1.jpg",
            githubUrl: "https:/url/"
        }

    ];
    res.json(projects);
};