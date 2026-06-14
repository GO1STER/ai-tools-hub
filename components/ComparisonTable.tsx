interface Tool {
  name: string;
  price: string;
  rating: number;
  [key: string]: string | number | boolean;
}

interface ComparisonTableProps {
  tools: Tool[];
  features: string[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      {"☆".repeat(5 - Math.ceil(rating))}
      <span className="text-gray-500 ml-1 text-xs">({rating}/5)</span>
    </span>
  );
}

export default function ComparisonTable({ tools = [], features = [] }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-indigo-50 text-indigo-900">
            <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 whitespace-nowrap">Tool</th>
            {features.map((f) => (
              <th key={f} className="text-left px-4 py-3 font-semibold border-b border-gray-200 whitespace-nowrap">{f}</th>
            ))}
            <th className="text-left px-4 py-3 font-semibold border-b border-gray-200">Price</th>
            <th className="text-left px-4 py-3 font-semibold border-b border-gray-200">Rating</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, i) => (
            <tr key={tool.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-100 whitespace-nowrap">{tool.name}</td>
              {features.map((f) => (
                <td key={f} className="px-4 py-3 text-gray-600 border-b border-gray-100">
                  {tool[f] === "✓" || tool[f] === true ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : tool[f] === "✗" || tool[f] === false ? (
                    <span className="text-red-400">✗</span>
                  ) : (
                    String(tool[f] ?? "—")
                  )}
                </td>
              ))}
              <td className="px-4 py-3 text-gray-700 border-b border-gray-100 whitespace-nowrap font-medium">{tool.price}</td>
              <td className="px-4 py-3 border-b border-gray-100"><Stars rating={tool.rating} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
