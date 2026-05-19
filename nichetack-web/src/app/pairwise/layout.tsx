import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare",
  description: "Two saved items at a time — pick the one your gut reaches for.",
};

export default function PairwiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
