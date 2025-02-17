"use client"

import React, { useRef, useState, useEffect } from "react";
import { ColorThief } from "@/utils/colourThief";
import Image from "next/image";

interface Bot {
  name: string;
  description: string;
  avatarUrl: string;
}

const MiniBotCard = ({ bot, index }: { bot: Bot; index: number }) => {
  const [dominantColor, setDominantColor] = useState<string>("#ffffff");
  const avatarRef = useRef<HTMLImageElement>(null);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  const handleAvatarLoad = () => setIsAvatarLoaded(true);

  useEffect(() => {
    const colorThief = new ColorThief();

    const calculateDominantColor = () => {
      if (avatarRef.current && isAvatarLoaded) {
        const dominant = colorThief.getColor(avatarRef.current);

        const dominantColorString = `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`;
        setDominantColor(dominantColorString);
      }
    };

    calculateDominantColor();
  }, [isAvatarLoaded]);

  return (
    <div
      className="flex flex-col duration-300 animate-in fade-in slide-in-from-bottom-4 bg-background/70 fill-mode-backwards"
      style={{ animationDelay: `${index * 100}ms`, "--primary": dominantColor } as React.CSSProperties }
    >
      <article className="group relative isolate grid cursor-pointer grid-cols-[min-content_1fr] items-center gap-2 rounded-xl border bg-tertiary p-2 ring-offset-2 ring-offset-background transition-all hover:ring-2 hover:ring-[var(--primary)]">
        <span className="relative flex shrink-0 overflow-hidden rounded-full size-12 border-2 bg-background">
          <Image
            ref={avatarRef}
            onLoad={handleAvatarLoad}
            className="aspect-square h-full w-full"
            src={bot.avatarUrl}
            alt={bot.name}
            width={128}
            height={128}
            priority={index === 0}
          />
        </span>
        <div className="flex flex-col overflow-hidden">
          <h3 className="truncate font-heading text-lg font-bold">{bot.name}</h3>
          <p className="truncate text-xs text-muted-foreground">{bot.description}</p>
        </div>
      </article>
    </div>
  );
};

export default MiniBotCard;