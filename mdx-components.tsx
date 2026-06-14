import type { MDXComponents } from "mdx/types";
import ComparisonTable from "@/components/ComparisonTable";
import ProsCons from "@/components/ProsCons";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import RatingStars from "@/components/RatingStars";
import AdSlot from "@/components/AdSlot";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ComparisonTable,
    ProsCons,
    AffiliateDisclosure,
    RatingStars,
    AdSlot,
    ...components,
  };
}
