import React from "react";
import Slider from "react-slick";

export default function ImageSlider() {
    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            <div className="min-h-[50vh] bg-red-400 relative">
                <div className="slider-text absolute z-10 max-w-md w-full bg-white bottom-0 p-5 px-10 rounded-t-3xl left-1/2 -translate-x-1/2">
                    <h3 className="text-3xl font-bold mb-5">Summer Collection</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam commodi adipisci repellat modi veniam sed a voluptatem nesciunt.</p>
                </div>
                <div className="slider-image absolute top-0 left-0 bg-green-500 h-full w-full">
                    <img src="https://picsum.photos/id/23/1000/500" className="w-full h-full object-cover" alt="" />
                </div>
            </div>
            <div className="min-h-[50vh] bg-red-400 relative">
                <div className="slider-text absolute z-10 max-w-md w-full bg-white bottom-0 p-5 px-10 rounded-t-3xl left-1/2 -translate-x-1/2">
                    <h3 className="text-3xl font-bold mb-5">Winter Collection</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam commodi adipisci repellat modi veniam sed a voluptatem nesciunt.</p>
                </div>
                <div className="slider-image absolute top-0 left-0 bg-green-500 h-full w-full">
                    <img src="https://picsum.photos/id/24/1000/500" className="w-full h-full object-cover" alt="" />
                </div>
            </div>
        </Slider>
    );
}