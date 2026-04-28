"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { Menu, X } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/stackin-logo.png"
              alt="StackIn"
              width={350}
              height={90}
              className="h-[53px] w-auto md:h-[60px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
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
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
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
              href="/features"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {showAuthCtas ? (
              <div className="flex flex-col gap-3 pt-4">
                <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="sm" className="w-full bg-primary text-primary-foreground">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
