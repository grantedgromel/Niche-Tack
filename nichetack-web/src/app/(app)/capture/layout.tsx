import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capture",
  description: "Save something to your stash in two taps.",
};

export default function CaptureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
