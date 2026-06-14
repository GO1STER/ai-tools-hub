"use client";

interface AdSlotProps {
  slot: string;
  className?: string;
  format?: "auto" | "rectangle" | "leaderboard" | "skyscraper";
}

export default function AdSlot({ slot, className = "", format = "auto" }: AdSlotProps) {
  const heights: Record<string, string> = {
    auto: "h-24",
    rectangle: "h-64",
    leaderboard: "h-24",
    skyscraper: "h-96",
  };

  return (
    <div
      className={`w-full ${heights[format]} bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-label="Advertisement"
    >
      <span>Advertisement · Slot: {slot}</span>
      {/* Replace this div with real AdSense code after approval:
          <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-XXXX" data-ad-slot={slot} data-ad-format={format} /> */}
    </div>
  );
}
