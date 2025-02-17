"use client";

import { useState, useEffect } from "react";
import BotCard from "@/components/BotCard";
import LandingCarousel from "@/components/landing/Carousel";
import Navbar from "@/components/Navbar";

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

      <Navbar className={showNavbar ? "translate-y-0" : "-translate-y-[100%]"}/>
    </div>
  );
}
