import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "О посёлке", href: "#about" },
  { label: "Инфраструктура", href: "#infra" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

interface NavbarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function Navbar({ scrolled, menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")}>
          <img
            src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/e9d2d724-6c0b-4825-8cf1-237446813bcc.png"
            alt="СтанВилл"
            className={`h-10 w-auto transition-all duration-500 ${scrolled ? "brightness-0" : ""}`}
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-gold ${scrolled ? "text-forest/70" : "text-white/80"}`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contacts")}
            className="bg-gold hover:bg-gold-dark text-[#1A1A1A] text-sm font-semibold px-5 py-2 rounded-sm transition-colors"
          >
            Консультация
          </button>
        </div>

        <button
          className={`md:hidden transition-colors ${scrolled ? "text-forest" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-forest/10 px-6 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-forest text-left text-sm font-medium py-1"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contacts")}
            className="mt-2 bg-gold text-[#1A1A1A] text-sm font-semibold px-5 py-2.5 rounded-sm text-center"
          >
            Консультация
          </button>
        </div>
      )}
    </nav>
  );
}