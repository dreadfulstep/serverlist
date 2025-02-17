import BotCard from "@/components/BotCard";

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
      <h2 className="text-center text-3xl font-bold text-white mb-4">🔥 Top Voted Bots</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
        {bots.map((bot) => (
          <BotCard key={bot.id} {...bot} />
        ))}
      </div>
    </section>
  );
};

export default BotSection;
