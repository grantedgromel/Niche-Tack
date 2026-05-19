import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[560px] flex-col items-center px-5 py-20 text-center lg:px-8 lg:py-28">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-3 text-[38px] lg:text-[52px]">
        nothing saved <em className="h-it">here</em>.
      </h1>
      <p className="h-display mt-3 text-[18px] leading-snug text-ink-2">
        That page isn&apos;t in your stash. It may have been archived, or never
        captured in the first place.
      </p>
      <Link href="/gallery" className="btn mt-7">
        Back to the gallery
      </Link>
    </div>
  );
}
