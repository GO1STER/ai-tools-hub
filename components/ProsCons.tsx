interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <span>✅</span> Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-900">
              <span className="text-green-500 mt-0.5 shrink-0">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <span>❌</span> Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <span className="text-red-500 mt-0.5 shrink-0">−</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
