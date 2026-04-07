import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setHeroOffset(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-body bg-[#F7F5F0] text-[#1A1A1A] overflow-x-hidden">
      <Navbar
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection
        heroOffset={heroOffset}
        scrollTo={scrollTo}
      />
      <GallerySection
        activePhoto={activePhoto}
        setActivePhoto={setActivePhoto}
      />
      <ContactSection
        scrollTo={scrollTo}
      />
    </div>
  );
}
