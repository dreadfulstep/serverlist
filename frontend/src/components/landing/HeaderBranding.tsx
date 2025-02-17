const HeaderBranding = () => {
  return (
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
  );
};

export default HeaderBranding;
