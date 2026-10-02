"use client";

import { useEffect } from "react";
import { captureUtmsFromSearch } from "@/lib/utm";

// Mounted once in the root layout so a tracked link landing on any page
// gets recorded. Runs only in the browser (useEffect), so the static export
// never touches window/localStorage at build time.
export function UtmCapture() {
  useEffect(() => {
    captureUtmsFromSearch(window.location.search);
  }, []);

  return null;
}
