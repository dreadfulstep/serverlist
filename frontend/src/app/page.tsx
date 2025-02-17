"use client";

import { useState, useEffect } from "react";
import LandingCarousel from "@/components/landing/Carousel";
import Navbar from "@/components/Navbar";
import HeaderBranding from "@/components/landing/HeaderBranding";
import BotSection from "@/components/landing/BotSection";
import RecentlyAddedSection from "@/components/landing/RecentlyAddedSection";

export default function Page() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bots = [
    {
      id: "zylo3",
      name: "Zylo",
      description: "Multi-purpose bot for your server",
      bannerUrl: "https://cdn.discordapp.com/banners/1289309667033485403/1638e09d2d3f0024903078946c6fd812.png?size=1024",
      avatarUrl: "https://cdn.discordapp.com/app-icons/1289309667033485403/4c0c922b8f0f8e219c3b7ecd394ddc8f.png?size=128",
      upvotes: 16,
      servers: 30400,
    },
    {
      id: "zylo2",
      name: "Zylo",
      description: "Multi-purpose bot for your server",
      bannerUrl: "https://cdn.discordapp.com/banners/1289309667033485403/1638e09d2d3f0024903078946c6fd812.png?size=1024",
      avatarUrl: "https://cdn.discordapp.com/app-icons/1289309667033485403/4c0c922b8f0f8e219c3b7ecd394ddc8f.png?size=128",
      upvotes: 16,
      servers: 30400,
    },
    {
      id: "zylo1",
      name: "Zylo",
      description: "Multi-purpose bot for your server",
      bannerUrl: "https://cdn.discordapp.com/banners/1289309667033485403/1638e09d2d3f0024903078946c6fd812.png?size=1024",
      avatarUrl: "https://cdn.discordapp.com/app-icons/1289309667033485403/4c0c922b8f0f8e219c3b7ecd394ddc8f.png?size=128",
      upvotes: 16,
      servers: 30400,
    },
    {
      id: "zylo",
      name: "Zylo",
      description: "Multi-purpose bot for your server",
      bannerUrl: "https://cdn.discordapp.com/banners/1289309667033485403/1638e09d2d3f0024903078946c6fd812.png?size=1024",
      avatarUrl: "https://cdn.discordapp.com/app-icons/1289309667033485403/4c0c922b8f0f8e219c3b7ecd394ddc8f.png?size=128",
      upvotes: 16,
      servers: 30400,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 md:px-0">
      <div className="absolute inset-0 -z-10 h-[150vh] bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="mb-10 mt-[calc(1.5rem-2px)]">
        <HeaderBranding />
        <LandingCarousel />
      </div>

      <BotSection bots={bots} />

      <RecentlyAddedSection bots={bots} />

      <Navbar className={showNavbar ? "translate-y-0" : "-translate-y-[100%]"} />
    </div>
  );
}
