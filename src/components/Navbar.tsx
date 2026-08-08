import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "О посёлке", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Инфраструктура", href: "#infrastructure" },
  { label: "Карта посёлка", href: "#infra" },
  { label: "Проекты домов", href: "#projects" },
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
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "md:h-16 h-32"}`}>
        <button onClick={() => scrollTo("#hero")}>
          <img
            src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/bbaa3488-b579-408d-a41e-62525dce7cb8.png"
            alt="Станички парк"
            className={`w-auto transition-all duration-500 ${scrolled ? "brightness-0 h-[3.25rem]" : "md:h-[3.25rem] h-[7.5rem]"}`}
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-[0.975rem] font-medium transition-colors duration-300 hover:text-gold ${scrolled ? "text-forest/70" : "text-white"}`}
            >
              {l.label}
            </button>
          ))}
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
        </div>
      )}
    </nav>
  );
}