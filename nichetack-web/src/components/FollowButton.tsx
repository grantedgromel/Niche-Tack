"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function FollowButton() {
  const [following, setFollowing] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFollowing((f) => !f)}
      aria-pressed={following}
      className={cn("btn px-6 py-2.5 text-[13px]", following && "ghost")}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
