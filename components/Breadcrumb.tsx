import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs, light }: { crumbs: Crumb[]; light?: boolean }) {
  const mutedCls = light ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-indigo-600";
  const sepCls   = light ? "text-white/40" : "text-gray-300";
  const activeCls = light ? "text-white font-medium" : "text-gray-700 font-medium";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        <li>
          <Link href="/" className={`transition-colors ${mutedCls}`}>Home</Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className={sepCls}>/</span>
            {crumb.href ? (
              <Link href={crumb.href} className={`transition-colors ${mutedCls}`}>{crumb.label}</Link>
            ) : (
              <span className={activeCls}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
