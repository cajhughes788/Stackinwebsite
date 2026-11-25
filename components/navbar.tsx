"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { ChevronDown, Menu, X } from "lucide-react";

// Sections listed under Features in the nav. Booking, Invoicing and Voice are
// sections of the Features page; Security and Pricing live on the home page.
const FEATURE_LINKS = [
  { label: "Booking", href: "/features#booking" },
  { label: "Invoicing", href: "/features#invoicing" },
  { label: "Voice", href: "/features#voice" },
  { label: "Security", href: "/#security" },
  { label: "Pricing", href: "/#pricing" },
];

// "Features" opens a small menu: on hover with a mouse, or by click / keyboard.
function FeaturesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-sm transition-colors hover:text-foreground ${open ? "text-foreground" : "text-muted-foreground"}`}
      >
        Features
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {/* pt-3 bridges the gap, so the menu stays open while the mouse moves down to it. */}
      <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${open ? "" : "pointer-events-none invisible"}`}>
        <div
          className={`w-48 rounded-xl border border-border bg-card/95 p-1.5 shadow-raised backdrop-blur-xl transition duration-150 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <Link
            href="/features"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-white/[0.05]"
          >
            All features
          </Link>
          <div className="mx-3 my-1 h-px bg-border" />
          {FEATURE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { user, authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const showAuthCtas = !authLoading && !user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-background/90 backdrop-blur-xl transition-colors duration-300 ${
        isScrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/521-logo.svg"
              alt="521"
              width={147}
              height={77}
              className="h-[26px] w-auto md:h-[28px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <FeaturesMenu />
            <Link
              href="/support"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Support
            </Link>
          </div>

          {/* Desktop CTA */}
          {showAuthCtas ? (
            <div className="hidden items-center gap-4 md:flex">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/signup">Get started</Link>
              </Button>
            </div>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-4 py-6">
            <Link
              href="/"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <div className="space-y-3 border-l border-border pl-4">
              {FEATURE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground/80 transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/support"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Support
            </Link>
            {showAuthCtas ? (
              <div className="flex flex-col gap-3 pt-4">
                <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="w-full bg-primary text-primary-foreground">
                  <Link href="/signup">Get started</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
