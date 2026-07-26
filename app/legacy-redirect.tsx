"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LegacyRedirect({ destination }: { destination: string }) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="legacy-redirect">
      <p>This portfolio page has moved.</p>
      <h1>Opening the current project…</h1>
      <Link href={destination}>Continue to the new page →</Link>
    </main>
  );
}
