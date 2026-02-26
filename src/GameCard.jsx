function euro(v) {
  return `€${Number(v).toFixed(2)}`;
}

export default function GameCard({ game }) {
  return (
    <article className="overflow-hidden border border-white/20 bg-[#24114f]">
      <div className="relative">
        <div className="h-[340px] bg-black">
          <img
            src={game.cover_url}
            alt={game.title}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 text-center text-xs text-white">
          🎮 {game.platform}
        </div>
      </div>

      <div className="p-3 text-white">
        <p className="text-[12px] font-semibold">{game.title}</p>

        <p className="mt-2 text-emerald-400 text-[11px] font-bold uppercase">
          {game.region}
        </p>

        <p className="mt-2 text-white/70 text-[11px]">
          From <span className="line-through">{euro(game.from_price)}</span>{" "}
          <span className="text-emerald-400">-{game.discount_percent}%</span>
        </p>

        <p className="text-[22px] font-extrabold">{euro(game.price)}</p>

        <p className="text-emerald-400 text-[11px]">
          Cashback: {euro(game.cashback)}
        </p>

        <p className="mt-2 text-white/70 text-[12px]">♡ {game.likes}</p>
      </div>
    </article>
  );
}