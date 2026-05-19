import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Everything you've saved, weighed by where it is in its life.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
