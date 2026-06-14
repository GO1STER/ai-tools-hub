interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  label?: string;
}

export default function RatingStars({ rating, maxRating = 5, label }: RatingStarsProps) {
  const pct = (rating / maxRating) * 100;
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 my-4">
      <div className="relative text-2xl leading-none">
        <span className="text-gray-200">{"★".repeat(maxRating)}</span>
        <span
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${pct}%` }}
        >
          {"★".repeat(maxRating)}
        </span>
      </div>
      <div className="text-sm">
        <span className="font-bold text-gray-900 text-lg">{rating}</span>
        <span className="text-gray-500">/{maxRating}</span>
        {label && <span className="ml-2 text-gray-600">{label}</span>}
      </div>
    </div>
  );
}
