
import {Carousel} from "flowbite-react";
import image1 from "../assets/images/kevin-ku-w7ZyuGYNpRQ-unsplash.jpg";
import image2 from "../assets/images/annie-spratt-QckxruozjRg-unsplash.jpg";
import image3 from "../assets/images/aranprime-1B-k2jrUHwU-unsplash.jpg";
import image4 from "../assets/images/arif-riyanto-vJP-wZ6hGBg-unsplash.jpg";

const AboutPage = () => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 content-center">
            <div className={"col-span-full relative left-40 top-20 text-center p-6 max-w-10/12 bg-gray-800 opacity-80 min-h-screen overscroll-contain"}>
                <h1 className={"text-7xl text-shadow-orange-600 text-shadow-md text-orange-200 py-2 leading-20 underline underline-offset-2"}>About BrightForge Widgets</h1>
                <p className={"text-3xl text-shadow-orange-600 text-shadow-md text-orange-200 leading-20 font-serif align-middle"}>At BrightForge Widgets, we believe innovation should be both powerful and accessible. Born from a passion for precision engineering and user-centered design, BrightForge creates high-quality, customizable widgets that inspire creativity and make everyday tasks easier. From tinkerers and students to industry professionals, our products are crafted to meet the needs of anyone who values performance and aesthetics. We combine cutting-edge technology with timeless craftsmanship to deliver widgets that are as dependable as they are dynamic. Our commitment to transparency, usability, and consistency extends beyond our products—it's reflected in every interaction, from our intuitive app experience to our responsive support team. BrightForge isn’t just a name—it’s a promise to forge brighter ideas, one widget at a time.</p>
            </div>
        </div>
    )
}
export default AboutPage;