import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/files/3d802d92-e2a6-4c0b-82ec-2b8c12288602.jpg";
const HOUSE_IMAGE = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/files/97aa8ca0-2a50-410a-99f0-be1cff14f71f.jpg";
const LAND_IMAGE = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/files/62c8e99c-9ffc-49eb-9493-4eeb3dfd1510.jpg";

const NAV_ITEMS = [
  { label: "О посёлке", href: "#about" },
  { label: "Проекты домов", href: "#projects" },
  { label: "Земельные участки", href: "#land" },
  { label: "Готовые дома", href: "#ready" },
  { label: "Инфраструктура", href: "#infra" },
  { label: "Карта", href: "#map" },
  { label: "Контакты", href: "#contacts" },
];

const HOUSE_PROJECTS = [
  { name: "«Сосновый»", area: "120 м²", rooms: "3 спальни", price: "от 4 200 000 ₽", style: "Скандинавский" },
  { name: "«Дубравный»", area: "180 м²", rooms: "4 спальни", price: "от 6 800 000 ₽", style: "Современный" },
  { name: "«Боярский»", area: "260 м²", rooms: "5 спален", price: "от 11 500 000 ₽", style: "Классика" },
  { name: "«Уютный»", area: "90 м²", rooms: "2 спальни", price: "от 3 100 000 ₽", style: "Минимализм" },
];

const LAND_PLOTS = [
  { id: "А-12", area: "12 соток", status: "Свободен", price: "850 000 ₽" },
  { id: "Б-07", area: "15 соток", status: "Свободен", price: "1 050 000 ₽" },
  { id: "В-03", area: "20 соток", status: "Продан", price: "1 400 000 ₽" },
  { id: "А-18", area: "10 соток", status: "Свободен", price: "700 000 ₽" },
  { id: "Б-14", area: "18 соток", status: "Резерв", price: "1 260 000 ₽" },
  { id: "В-09", area: "25 соток", status: "Свободен", price: "1 750 000 ₽" },
];

const GALLERY_IMAGES = [
  { src: HOUSE_IMAGE, caption: "Дом «Дубравный», сдан 2024" },
  { src: LAND_IMAGE, caption: "Участок у леса, зона Б" },
  { src: HERO_IMAGE, caption: "Вид с воздуха на посёлок" },
  { src: HOUSE_IMAGE, caption: "Дом «Сосновый», сдан 2023" },
  { src: LAND_IMAGE, caption: "Участок у пруда, зона А" },
  { src: HERO_IMAGE, caption: "Общая территория посёлка" },
];

const INFRA_ITEMS = [
  { icon: "ShieldCheck", title: "Охраняемая территория", desc: "КПП, видеонаблюдение 24/7" },
  { icon: "Zap", title: "Электроснабжение", desc: "15 кВт на участок, кабельная линия" },
  { icon: "Droplets", title: "Водоснабжение", desc: "Центральный водопровод и скважины" },
  { icon: "Flame", title: "Газ", desc: "Газопровод высокого давления" },
  { icon: "Trees", title: "Лес и пруд", desc: "Выход к лесу, рыболовный пруд" },
  { icon: "Car", title: "Дороги", desc: "Асфальтированные дороги внутри посёлка" },
  { icon: "Wifi", title: "Интернет", desc: "Оптоволокно до каждого участка" },
  { icon: "Baby", title: "Детская площадка", desc: "Современный игровой комплекс" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [galleryTab, setGalleryTab] = useState<"houses" | "land" | "infra">("houses");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-body text-forest bg-white">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className={`font-display text-2xl tracking-wider font-semibold transition-colors duration-500 ${
              scrolled ? "text-forest" : "text-white"
            }`}
          >
            СтанВил
          </div>

          <ul className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className={`text-sm tracking-wide font-medium transition-colors duration-300 hover:text-gold ${
                    scrolled ? "text-forest" : "text-white/90"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden lg:block bg-gold text-white text-sm px-5 py-2.5 tracking-wide font-medium hover:bg-gold-dark transition-colors duration-200"
          >
            Связаться
          </button>

          <button
            className={`lg:hidden transition-colors ${scrolled ? "text-forest" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-forest/10 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-forest text-left text-sm font-medium py-1 hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO_IMAGE} alt="СтанВил с воздуха" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold text-sm tracking-[0.35em] uppercase mb-6 font-medium">
            Смоленская область · Деревня Станички
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white font-light leading-none mb-8 tracking-wide">
            СтанВил
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Коттеджный посёлок в окружении смоленских лесов. Природа, тишина и продуманная инфраструктура.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("#projects")}
              className="bg-gold text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold-dark transition-colors duration-200"
            >
              Выбрать дом
            </button>
            <button
              onClick={() => scrollTo("#land")}
              className="border border-white/60 text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors duration-200"
            >
              Участки
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-white/50" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">О посёлке</p>
              <h2 className="font-display text-5xl text-forest font-light leading-tight mb-8">
                Жизнь в гармонии<br />с природой
              </h2>
              <p className="text-forest/70 leading-relaxed mb-6 text-base">
                СтанВил — это закрытый коттеджный посёлок в Смоленской области, расположенный в районе живописной деревни Станички. Чистый воздух, сосновые леса, собственный пруд и всего 130 км от Москвы.
              </p>
              <p className="text-forest/70 leading-relaxed mb-10 text-base">
                Мы создаём не просто дома — мы строим сообщество людей, ценящих качество жизни, уединение и природу. Каждый участок обеспечен всеми необходимыми коммуникациями.
              </p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { num: "47", label: "Участков в посёлке" },
                  { num: "12", label: "Готовых домов" },
                  { num: "2019", label: "Год основания" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-4xl text-gold font-light">{stat.num}</div>
                    <div className="text-xs text-forest/50 mt-1 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={HERO_IMAGE} alt="Посёлок СтанВил" className="w-full h-[480px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-forest p-6 hidden md:block">
                <p className="text-gold text-xs tracking-widest uppercase mb-1">Расстояние от Москвы</p>
                <p className="text-white font-display text-3xl font-light">130 км</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOUSE PROJECTS */}
      <section id="projects" className="py-28 bg-forest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Проекты домов</p>
            <h2 className="font-display text-5xl text-white font-light">Выберите свой проект</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOUSE_PROJECTS.map((house) => (
              <div
                key={house.name}
                className="group bg-forest-light border border-white/10 hover:border-gold/50 transition-all duration-300 overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={HOUSE_IMAGE}
                    alt={house.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gold tracking-widest uppercase mb-2">{house.style}</div>
                  <h3 className="font-display text-xl text-white font-light mb-4">{house.name}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Площадь</span>
                      <span className="text-white">{house.area}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Спальни</span>
                      <span className="text-white">{house.rooms}</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-gold font-medium text-sm">{house.price}</span>
                    <button className="text-white/50 hover:text-gold transition-colors">
                      <Icon name="ArrowRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => scrollTo("#contacts")}
              className="border border-gold text-gold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-200"
            >
              Запросить каталог
            </button>
          </div>
        </div>
      </section>

      {/* LAND PLOTS */}
      <section id="land" className="py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Земельные участки</p>
              <h2 className="font-display text-5xl text-forest font-light leading-tight mb-6">
                Найдите свой<br />идеальный участок
              </h2>
              <p className="text-forest/60 leading-relaxed mb-8">
                Участки от 10 до 25 соток. Все наделы подключены к центральным коммуникациям, выход к лесу, развитая дорожная сеть.
              </p>
              <img src={LAND_IMAGE} alt="Участки СтанВил" className="w-full h-64 object-cover" />
            </div>
            <div>
              <div className="space-y-3">
                {LAND_PLOTS.map((plot) => (
                  <div
                    key={plot.id}
                    className={`flex items-center justify-between p-5 border transition-colors ${
                      plot.status === "Продан"
                        ? "border-gray-200 bg-gray-50 opacity-60"
                        : plot.status === "Резерв"
                        ? "border-gold/30 bg-gold/5"
                        : "border-forest/15 bg-white hover:border-gold/40 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-display text-2xl text-forest font-light w-12">{plot.id}</span>
                      <div>
                        <div className="text-sm font-medium text-forest">{plot.area}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            plot.status === "Продан"
                              ? "text-gray-400"
                              : plot.status === "Резерв"
                              ? "text-gold"
                              : "text-green-600"
                          }`}
                        >
                          {plot.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-forest text-sm">{plot.price}</div>
                      {plot.status === "Свободен" && (
                        <button className="text-xs text-gold mt-1 hover:underline">Подробнее →</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo("#contacts")}
                className="mt-8 w-full bg-forest text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-forest/90 transition-colors duration-200"
              >
                Получить схему участков
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="ready" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Фотогалерея</p>
            <h2 className="font-display text-5xl text-forest font-light mb-8">Готовые дома и территория</h2>
            <div className="flex justify-center gap-2">
              {(["houses", "land", "infra"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGalleryTab(tab)}
                  className={`px-6 py-2.5 text-sm tracking-wide transition-colors duration-200 ${
                    galleryTab === tab
                      ? "bg-forest text-white"
                      : "border border-forest/20 text-forest hover:border-forest"
                  }`}
                >
                  {tab === "houses" ? "Дома" : tab === "land" ? "Участки" : "Инфраструктура"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative group cursor-pointer overflow-hidden aspect-[4/3]"
                onClick={() => setActiveGallery(i)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-all duration-300 flex items-end">
                  <p className="text-white text-sm px-4 pb-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {img.caption}
                  </p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ZoomIn" size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeGallery !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveGallery(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setActiveGallery(null)}>
            <Icon name="X" size={32} />
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActiveGallery((p) => (p! > 0 ? p! - 1 : GALLERY_IMAGES.length - 1)); }}
          >
            <Icon name="ChevronLeft" size={40} />
          </button>
          <img
            src={GALLERY_IMAGES[activeGallery].src}
            alt={GALLERY_IMAGES[activeGallery].caption}
            className="max-w-4xl max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActiveGallery((p) => (p! < GALLERY_IMAGES.length - 1 ? p! + 1 : 0)); }}
          >
            <Icon name="ChevronRight" size={40} />
          </button>
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {GALLERY_IMAGES[activeGallery].caption}
          </p>
        </div>
      )}

      {/* INFRASTRUCTURE */}
      <section id="infra" className="py-28 bg-forest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Инфраструктура</p>
            <h2 className="font-display text-5xl text-white font-light">Всё для жизни</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFRA_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border border-white/10 p-6 hover:border-gold/40 transition-colors duration-300"
              >
                <div className="mb-4">
                  <Icon name={item.icon} size={28} className="text-gold" fallback="Check" />
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Карта</p>
            <h2 className="font-display text-5xl text-forest font-light mb-4">Как нас найти</h2>
            <p className="text-forest/60 max-w-xl mx-auto">
              Смоленская область, Смоленский район, деревня Станички. 130 км от Москвы по трассе М1.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {[
              { icon: "Car", title: "На автомобиле", desc: "М1 «Беларусь» → съезд на Смоленск → Станички. 130 км от МКАД, ~1,5 часа." },
              { icon: "Train", title: "На электричке", desc: "С Белорусского вокзала до Смоленска. Далее такси ~25 км до посёлка." },
              { icon: "MapPin", title: "Координаты", desc: "54.8412° N, 32.0451° E. Добавлено в Яндекс.Карты." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 border border-forest/10">
                <Icon name={item.icon} size={24} className="text-gold flex-shrink-0 mt-0.5" fallback="Map" />
                <div>
                  <h3 className="font-medium text-forest mb-2 text-sm">{item.title}</h3>
                  <p className="text-forest/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-80 bg-forest/5 border border-forest/10 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Map" size={40} className="text-gold mx-auto mb-3" />
              <p className="text-forest/40 text-sm mb-4">Интерактивная карта будет добавлена</p>
              <button
                onClick={() => scrollTo("#contacts")}
                className="text-gold text-sm underline hover:text-forest transition-colors"
              >
                Запросить маршрут →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-forest">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Контакты</p>
            <h2 className="font-display text-5xl text-white font-light mb-4">Свяжитесь с нами</h2>
            <p className="text-white/50 max-w-md mx-auto text-sm">
              Оставьте заявку — мы расскажем о свободных участках, ценах и проектах домов
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@stanvil.ru" },
                { icon: "MapPin", label: "Адрес", value: "Смоленская обл., дер. Станички" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 9:00 – 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={18} className="text-gold" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs tracking-wider uppercase mb-1">{c.label}</div>
                    <div className="text-white font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Комментарий (необязательно)"
                className="w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gold text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold-dark transition-colors duration-200"
              >
                Отправить заявку
              </button>
              <p className="text-white/25 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-white text-lg tracking-wider">СтанВил</span>
          <span className="text-white/30 text-xs">© 2024 КП СтанВил · Смоленская область</span>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-white/30 text-xs hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
