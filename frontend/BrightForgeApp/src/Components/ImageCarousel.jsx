
import { Carousel } from "flowbite-react";

const ImageCarousel = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel pauseOnHover>
                <img src="../assets/images/kevin-ku-w7ZyuGYNpRQ-unsplash.jpg" alt="..." />
                <img src="../assets/images/annie-spratt-QckxruozjRg-unsplash.jpg" alt="..." />
                <img src="../assets/images/aranprime-1B-k2jrUHwU-unsplash.jpg" alt="..." />
                <img src="../assets/images/arif-riyanto-vJP-wZ6hGBg-unsplash.jpg" alt="..." />
            </Carousel>
        </div>
    );
}
export default ImageCarousel();
