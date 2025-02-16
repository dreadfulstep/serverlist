"use client"

import BotCard from "@/components/BotCard";
import LandingCarousel from "@/components/landing/Carousel"

export default function Page() {
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
    <div className="relative flex flex-col items-center justify-center w-full px-4 py-8 md:px-0">
          <div className="absolute inset-0 -z-10 h-[150vh] bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <LandingCarousel />
          {bots.map((bot) => (
            <BotCard key={bot.id} {...bot} />
          ))}
    </div>
  )
}
