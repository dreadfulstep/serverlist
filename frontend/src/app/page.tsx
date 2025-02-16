"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Page() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-6">
                <div className="relative bg-neutral-950 text-white rounded-xl shadow-2xl p-12 flex flex-row items-center justify-between h-72 w-full">
                  {/* Background Overlay */}
                  <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundSize: "500px", backgroundImage: "url('/noise.svg')" }}></div>
                  
                  {/* Left side - Text */}
                  <div className="relative z-10 max-w-md">
                    <h2 className="text-3xl font-bold">In Development Build</h2>
                    <p className="text-lg text-gray-300 mt-4">
                      This build is in development. Features may change or break at any time.
                    </p>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                      Join the Community
                    </Button>
                  </div>

                  <div className="absolute bottom-8 right-16 flex -space-x-4 z-10">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
