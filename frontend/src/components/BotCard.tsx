import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColorThief } from "@/utils/colourThief";
import { ArrowBigUpDash, ArrowDownToLine, Hash, LucideChevronsUp } from "lucide-react";

interface BotCardProps {
  id: string;
  name: string;
  description: string;
  bannerUrl: string;
  avatarUrl: string;
  upvotes: number;
  servers: number;
}

export default function BotCard({
  id,
  name,
  description,
  bannerUrl,
  avatarUrl,
  upvotes,
  servers,
}: BotCardProps) {
  const [dominantColor, setDominantColor] = useState<string>("#ffffff");
  const avatarRef = useRef<HTMLImageElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  useEffect(() => {
    const colorThief = new ColorThief();

    const calculateDominantColor = () => {
      if (avatarRef.current && isAvatarLoaded) {
        const avatarColor = colorThief.getColor(avatarRef.current);
        const colorFromAvatar = `rgba(${avatarColor.r}, ${avatarColor.g}, ${avatarColor.b})`;
        setDominantColor(colorFromAvatar);
      }
    };

    calculateDominantColor();
  }, [isAvatarLoaded, isBannerLoaded]);

  const handleAvatarLoad = () => setIsAvatarLoaded(true);
  const handleBannerLoad = () => setIsBannerLoaded(true);

  return (
    <div
        className="flex justify-center bg-background/70 duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
        style={{ animationDelay: "0ms", "--primary": dominantColor } as React.CSSProperties}
    >
      <article
        className="group relative isolate flex w-full max-w-[22rem] flex-col rounded-xl border bg-tertiary ring-offset-2 ring-offset-background transition-all hover:ring-2 hover:ring-[var(--primary)] cursor-pointer"
        data-state="closed"
        style={{ "--ring-color": dominantColor } as React.CSSProperties}
      >
        {bannerUrl && (
          <div className="aspect-[17/6] overflow-hidden rounded-t-xl border-b bg-secondary">
            <span className="relative shrink-0 block h-full w-full overflow-hidden rounded-none bg-none">
              <Image
                ref={bannerRef}
                className="h-full w-full aspect-[17/6] object-cover"
                src={bannerUrl}
                alt={`${name} banner`}
                layout="fill"
                objectFit="cover"
                onLoad={handleBannerLoad}
              />
            </span>
          </div>
        )}

        <div className="flex justify-between pb-4 pl-4 pr-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full -mt-10 size-20 border-2 bg-background">
            <Image
              ref={avatarRef}
              className="aspect-square h-full w-full"
              src={avatarUrl}
              alt={`${name} avatar`}
              layout="fill"
              objectFit="cover"
              onLoad={handleAvatarLoad}
            />
          </span>

          <div className="flex items-center gap-2 pt-2 text-sm">
            <Link
              href={`/bots/${id}/reviews`}
              className="flex items-center rounded-md border border-green-500 bg-green-500/20 px-1 py-1 text-xs text-green-500 transition-colors hover:bg-green-500/40 hover:text-white"
            >
                <LucideChevronsUp className="size-4"/>
            </Link>
            <div className="flex cursor-default items-center rounded-md border bg-secondary/60 hover:bg-secondary/40 px-2 py-1 text-xs text-muted-foreground">
                <ArrowDownToLine className="mr-1.5 size-4"/>
                {servers.toLocaleString()}
            </div>
            <Link
              href={`/bots/${id}/vote`}
              className="flex items-center rounded-md border bg-secondary/60 hover:bg-secondary/40 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowBigUpDash className="mr-1.5 size-4"/>
                {upvotes}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <h1 className="truncate font-heading text-xl font-bold">{name}</h1>
          <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="relative mt-4 flex gap-2 overflow-hidden px-4 pb-4">
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-24 bg-background mask-linear mask-dir-to-l mask-to-0 mask-via-50"></div>          <Link href="/tag/ashmw" className="flex items-center whitespace-nowrap rounded-md border bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Hash size={24} className="mr-1 size-3.5"/>
            Utility
          </Link>
          <Link href="/tag/ashmw" className="flex items-center whitespace-nowrap rounded-md border bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Hash size={24} className="mr-1 size-3.5"/>
            Birthday
          </Link>
          <Link href="/tag/ashmw" className="flex items-center whitespace-nowrap rounded-md border bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Hash size={24} className="mr-1 size-3.5"/>
            Celebration
          </Link>
          <Link href="/tag/ashmw" className="flex items-center whitespace-nowrap rounded-md border bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Hash size={24} className="mr-1 size-3.5"/>
            Event
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 pt-0">
          <Link
            href={`/bots/${id}`}
            className="inline-flex select-none items-center group/button hover:bg-[var(--primary)] border border-[var(--primary)] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-accent/30 text-accent-foreground h-10 px-4 py-2 hover:text-primary-foreground"
          >
            View
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href={`/bots/${id}/add`}
            className="inline-flex select-none items-center group/button justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-accent/50 text-accent-foreground hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Add Bot
          </Link>
        </div>
      </article>
    </div>
  );
}
