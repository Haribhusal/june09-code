import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function ImageSlider() {
    const sliderData = [
        {
            id: 1,
            path: 'https://picsum.photos/id/13/1000/600'
        },
        {
            id: 2,
            path: 'https://picsum.photos/id/14/1000/600'
        },
        {
            id: 3,
            path: 'https://picsum.photos/id/15/1000/600'
        }
    ]
    return (
        <section>
            <div className="max-w-7xl mx-auto py-10">
                <Carousel className="">
                    <CarouselContent>
                        {sliderData.map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <div className="p-0">
                                        <div className="flex items-center justify-center">
                                            <img src={_.path} className="w-full rounded-md max-h-[50vh] object-cover" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </section>

    )
}
