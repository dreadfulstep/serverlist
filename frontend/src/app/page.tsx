"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BotCard from "@/components/BotCard";
import LandingCarousel from "@/components/landing/Carousel";
import { LucideBook, LucideHouse, LucidePlus, LucideSearch } from "lucide-react";

export default function Page() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bots = [
    {
      id: "birthdaybot",
      name: "Birthday Bot",
      description: "Keep track of member birthdays in your server!",
      bannerUrl: "https://cdn.discordapp.com/banners/618817616542433283/c6c40a4d2327e63f1d0c61e97c7016cc.webp?size=512",
      avatarUrl: "https://cdn.discordapp.com/avatars/618817616542433283/fce38fcf6f1fbc1b16cd06b9c36b90a7.webp?size=128",
      upvotes: 16,
      servers: 30400,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 md:px-0">
      <div className="absolute inset-0 -z-10 h-[150vh] bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="mb-10 mt-[calc(1.5rem-2px)]">
        <div className="container mb-[calc(1.5rem-2px)]">
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none flex select-none items-center gap-2 bg-background font-heading text-2xl font-bold">
              zylolabs.xyz
              <div className="rounded-lg border-2 border-blue-500/50 bg-blue-500/10 px-1 py-0.5 text-xs font-bold uppercase text-blue-500/80 backdrop-blur-lg">
                Beta
              </div>
            </div>
          </div>
        </div>
        <LandingCarousel />
      </div>
      {bots.map((bot) => (
        <BotCard key={bot.id} {...bot} />
      ))}

      <div
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-center p-2 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-[100%]"
        }`}
      >
        <nav className="flex max-w-md w-full items-center justify-between bg-black/90 backdrop-blur-lg py-2 px-2 md:rounded-xl md:border">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 pl-4 pr-2 font-heading text-lg font-bold transition-colors hover:text-blue-500"
            >
              zylolabs.xyz
              <div className="rounded-lg border-2 border-blue-500/50 bg-blue-500/10 px-1 py-0.5 text-xs font-bold uppercase text-blue-500/80 backdrop-blur-lg">
                Beta
              </div>
            </Link>

            <div className="mx-4 h-4 border-r-2"/>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex select-none items-center group/button justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-accent/50 text-accent-foreground hover:bg-accent hover:text-accent-foreground h-9 rounded-md [&amp;:first-child:not(a):not(button)]:cursor-default relative aspect-square px-0">
              <LucideHouse className="size-5" />
              <div className="absolute -bottom-2.5 left-0 right-0 rounded-t-lg border-b-4 border-blue-500"></div>
            </Link>
            <Link href="/new" className="inline-flex select-none items-center group/button justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground h-9 rounded-md [&amp;:first-child:not(a):not(button)]:cursor-default relative aspect-square px-0">
              <LucideSearch className="size-5" />
            </Link>
            <Link href="/search" className="inline-flex select-none items-center group/button justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground h-9 rounded-md [&amp;:first-child:not(a):not(button)]:cursor-default relative aspect-square px-0">
              <LucidePlus className="size-5" />
            </Link>
            <Link href="/docs" className="inline-flex select-none items-center group/button justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground h-9 rounded-md [&amp;:first-child:not(a):not(button)]:cursor-default relative aspect-square px-0">
              <LucideBook className="size-5" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
