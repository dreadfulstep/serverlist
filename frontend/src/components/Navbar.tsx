import { LucideBook, LucideHouse, LucidePlus, LucideSearch } from "lucide-react"
import Link from "next/link"

const Navbar = ({ className } : { className?: string} ) => {
    return (
        <div className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-center p-2 transition-all duration-300
            ${className ? className : ""}`}
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
    )
};

export default Navbar;