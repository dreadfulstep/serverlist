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

export default function LandingCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <div className="flex max-w-7xl w-full">
      <Carousel
        plugins={[plugin.current]}
        className="min-w-0 shrink-0 grow-0 basis-full relative isolate grid aspect-auto select-none overflow-hidden border border-white/25 rounded-lg"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="relative bg-neutral-950 text-white rounded-xl shadow-2xl p-12 flex flex-row items-center justify-between h-72 w-full">
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundSize: "500px", backgroundImage: "url('/noise.svg')" }}></div>
                
                <div className="relative z-10 max-w-md">
                  <h2 className="text-3xl font-bold">In Development Build</h2>
                  <p className="text-lg text-gray-300 mt-4">
                    This build is in development. Features may change or break at any time.
                  </p>
                  <Button className="mt-6 bg-neutral-600 text-white hover:bg-blue-700">
                    Join the Community
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 right-16 flex gap-2">
          <CarouselPrevious className="h-9 w-9 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground"/>
          <CarouselNext className="h-9 w-9 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground"/>
        </div>
      </Carousel>
    </div>
  )
}
