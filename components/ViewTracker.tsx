"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Track view
    fetch(`/api/views/${slug}`, {
      method: "POST",
    });
  }, [slug]);

  return null;
}
