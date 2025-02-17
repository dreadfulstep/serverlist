import React from "react";
import MiniBotCard from "../MiniBotCard";

interface Bot {
  name: string;
  description: string;
  avatarUrl: string;
}

const RecentlyAddedSection = ({ bots }: { bots: Bot[] }) => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bots.map((bot, index) => (
          <MiniBotCard key={index} bot={bot} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyAddedSection;
