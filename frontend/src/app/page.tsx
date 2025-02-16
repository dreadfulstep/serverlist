"use client"

import LandingCarousel from "@/components/landing/Carousel"

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 py-8 md:px-0">
          <div className="absolute inset-0 -z-10 h-[150vh] bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <LandingCarousel />
    </div>
  )
}
