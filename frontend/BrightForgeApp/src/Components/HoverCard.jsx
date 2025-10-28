import {useState} from "react";


export const HoverCard = ({ title, short, long }) => {
    const [hovered, setHovered] = useState(false);

    return(
        <div className="bg-gray-600 rounded-2xl border-orange-600 border-4 shadow-md p-8 cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl h-64 flex flex-col justify-between"
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            >
            <h2 className={"text-white text-2xl font-semibold  mb-2 text-center"}>{title}</h2>

            <div className={"relative flex-grow flex items-center justify-center"}>
                <p
                    className={`absolute text-white text-center px-4 transition-opacity duration-300 ${
                        hovered ? "opacity-0" : "opacity-100"
                    }`}>
                    {short}
                </p>
                <p
                    className={`absolute text-white text-center px-4 transition-opacity duration-300 ${
                        hovered ? "opacity-100" : "opacity-0"
                    }`}>
                    {long}
                </p>
            </div>

        </div>
    )



}