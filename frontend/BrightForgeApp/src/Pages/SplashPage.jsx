import {HoverCard} from "../Components/HoverCard.jsx";


const SplashPage = () => {
    const cards = [
        {
            title: "Smart Inventory",
            short: "Track your widgets in real-time",
            long: "Our smart inventory system updates automatically to reflect real-time stock levels, making management effortless.",
        },
        {
            title: "Data Insights",
            short: "Visualize performance trends",
            long: "Analyze product lifecycles and sales patterns with beautiful analytics dashboards designed for clarity and insight.",
        },
        {
            title: "Custom Widgets",
            short: "Build your perfect configuration.",
            long: "Mix, match, and customize widgets to suit your workflow with our modular design and dynamic creation tools.",
        }
    ]
    const username = localStorage.getItem("username")



    return (
        <div className={"min-h-screen bg-gray-800 bg-gradient-to-br flex flex-col items-center justify-center px-6 py-10"}>
            <h1 className={"text-5xl font-bold text-white mb-4 text-center"}>
                Welcome to BrightForge Widgets
            </h1>
            <p className={"text-6xl font-extrabold bg-gradient-to-r from-orange-600 via-gray-500 to-indigo-400 text-transparent bg-clip-text animate-gradient-text animate-gradient-text-bg pb-5"}>{username}</p>
            <p className={"text-lg text-white mb-12 text-center max-w-2xl"}>
                Discover the next generation of widget management - smarter tracking, cleaner analytics, and total customization
            </p>

            <div className={"grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl"}>
                {cards.map((card, index) => (
                    <HoverCard key={index} {...card} />
                ))}
            </div>
        </div>

    )
}

export default SplashPage;