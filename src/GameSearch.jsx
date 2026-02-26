import { useEffect, useState } from "react";
import GameCard from "./GameCard";

export default function GameSearch() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = setTimeout(async () => {
      const url = search.trim()
        ? `/list?search=${encodeURIComponent(search.trim())}`
        : "/list";

      const response = await fetch(url);
      const data = await response.json();
      setItems(data.items ?? []);
    }, 250);

    return () => clearTimeout(id);
  }, [search]);

  return (
    <div className="min-h-dvh bg-[#4b21b3]">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center gap-6">
        <h1 className="text-2xl font-extrabold text-white">eneba</h1>

        <div className="relative w-full max-w-155">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent px-12 py-3 text-white ring-2 ring-white/70 outline-none"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        <p className="mb-4 text-white/80 text-sm">Results found: {items.length}</p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}