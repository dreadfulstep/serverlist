import BotCard from "@/components/BotCard";
import { LucideChevronsUp } from "lucide-react";

interface Bot {
  id: string;
  name: string;
  description: string;
  bannerUrl: string;
  avatarUrl: string;
  upvotes: number;
  servers: number;
}

const BotSection = ({ bots }: { bots: Bot[] }) => {
  return (
    <section className="w-full container mx-auto my-12 px-4 md:px-6">
      <h2 className="text-left text-3xl font-bold flex items-center text-white mb-4">
        <LucideChevronsUp className="size-9 mr-3 bg-blue-500/15 p-1 border border-blue-500 text-blue-500 rounded-lg"/>
        <span className="border-b-2 font-heading border-blue-500 bg-blue-500/10 text-blue-500">Top Voted</span>
        <span className="ml-3 font-heading">This Month</span>
      </h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
        {bots.map((bot) => (
          <BotCard key={bot.id} {...bot} />
        ))}
      </div>
    </section>
  );
};

export default BotSection;
