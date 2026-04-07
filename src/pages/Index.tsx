import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  entrance: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4fe7e409-5218-43f1-8195-ac3868313d18.jpg",
  aerial1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/34cebcf8-81f7-40bc-b51c-7ff2f72e3408.jpg",
  sports: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/670b367f-605c-4a15-a6ce-933866ffc4e9.jpg",
  aerial2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/aaac7ed1-619f-42cc-919d-6edd2ba3d010.jpg",
  clubhouse: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/c84777e9-5fab-4432-9720-3ea147a52032.jpg",
};

const NAV_ITEMS = [
  { label: "О посёлке", href: "#about" },
  { label: "Инфраструктура", href: "#infra" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const FEATURES = [
  { icon: "TreePine", title: "Сосновый лес", desc: "Посёлок утопает в вековых соснах — природа прямо у порога" },
  { icon: "Shield", title: "Охраняемая территория", desc: "КПП с шлагбаумом, видеонаблюдение 24/7, охрана периметра" },
  { icon: "Zap", title: "Все коммуникации", desc: "Газ, электричество 15 кВт, центральный водопровод и канализация" },
  { icon: "Car", title: "Дороги и тротуары", desc: "Асфальт, тротуары, уличное освещение и парковочные карманы" },
];

const INFRA = [
  { emoji: "🎾", title: "Падел-теннис", desc: "2 крытых корта" },
  { emoji: "⚽", title: "Футбольное поле", desc: "С искусственным газоном" },
  { emoji: "🛹", title: "Памп-трек", desc: "Для детей и взрослых" },
  { emoji: "🛝", title: "Детская площадка", desc: "Современная игровая зона" },
  { emoji: "🌳", title: "Парковые аллеи", desc: "Зоны отдыха и прогулок" },
  { emoji: "🏠", title: "Клубный дом", desc: "Центр жизни посёлка" },
];

const GALLERY = [
  { url: IMAGES.aerial2, caption: "Общий вид посёлка" },
  { url: IMAGES.entrance, caption: "Въезд — КПП СтанВил" },
  { url: IMAGES.aerial1, caption: "Вид с высоты птичьего полёта" },
  { url: IMAGES.sports, caption: "Спортивная зона: теннис и футбол" },
  { url: IMAGES.clubhouse, caption: "Клубный дом и парковка" },
];

const HOUSE_PROJECTS = [
  { name: "«Сосновый»", area: "120 м²", rooms: "3 спальни", price: "от 4 200 000 ₽", style: "Скандинавский" },
  { name: "«Дубравный»", area: "180 м²", rooms: "4 спальни", price: "от 6 800 000 ₽", style: "Современный" },
  { name: "«Боярский»", area: "260 м²", rooms: "5 спален", price: "от 11 500 000 ₽", style: "Классика" },
  { name: "«Уютный»", area: "90 м²", rooms: "2 спальни", price: "от 3 100 000 ₽", style: "Минимализм" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="font-body bg-[#F7F5F0] text-[#1A1A1A] overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-forest rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold font-display">СВ</span>
            </div>
            <span className={`font-display text-xl font-semibold tracking-wide transition-colors duration-500 ${scrolled ? "text-forest" : "text-white"}`}>
              СтанВил
            </span>
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

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img
          src={IMAGES.aerial2}
          alt="КП СтанВил с высоты"
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom origin-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F15]/90 via-[#0D1F15]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-gold font-semibold text-xs tracking-[0.25em] uppercase mb-5">
              Коттеджный посёлок · Смоленская область · 130 км от Москвы
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] mb-6">
              Жизнь в лесу,<br />
              <em className="italic text-gold-light">но со всеми удобствами</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
              Закрытый посёлок в сосновом лесу деревни Станички. Дома от 90 м² на участках 8–20 соток. Теннис, футбол, памп-трек, детская площадка.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-gold hover:bg-gold-dark text-[#1A1A1A] font-semibold text-sm px-8 py-4 rounded-sm transition-colors"
              >
                Узнать о свободных участках
              </button>
              <button
                onClick={() => scrollTo("#gallery")}
                className="border border-white/40 text-white hover:bg-white/10 text-sm font-medium px-8 py-4 rounded-sm transition-colors"
              >
                Смотреть рендеры
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2 text-white/40 text-xs animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-forest text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "130 км", label: "от МКАД по трассе М1" },
            { value: "50+", label: "домовладений в посёлке" },
            { value: "8–20 соток", label: "размеры участков" },
            { value: "2025", label: "год сдачи инфраструктуры" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl font-light text-gold mb-1">{s.value}</div>
              <div className="text-white/50 text-xs leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">О посёлке</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6 text-forest">
              Место, где хочется<br /><em className="italic">остаться навсегда</em>
            </h2>
            <p className="text-[#555] leading-relaxed mb-5">
              КП «СтанВил» расположен в деревне Станички Смоленской области — в окружении вековых сосен, вдали от городского шума, но с современной инфраструктурой.
            </p>
            <p className="text-[#555] leading-relaxed mb-8">
              Единый архитектурный стиль, широкие улицы с тротуарами и богатая спортивно-рекреационная инфраструктура создают настоящее дружное сообщество.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white rounded-xl p-4 border border-[#E8E5DE] hover:border-forest/20 transition-colors">
                  <div className="w-9 h-9 bg-forest/8 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={f.icon as "TreePine"} size={18} className="text-forest" />
                  </div>
                  <div className="font-semibold text-sm text-[#1A1A1A] mb-1">{f.title}</div>
                  <div className="text-xs text-[#888] leading-snug">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={IMAGES.entrance}
              alt="Въезд в посёлок СтанВил"
              className="w-full rounded-2xl object-cover aspect-[4/5] shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl p-5 shadow-xl border border-[#E8E5DE]">
              <div className="font-display text-xl font-semibold text-forest mb-1">КП «СтанВил»</div>
              <div className="text-xs text-[#888]">Смоленская обл., д. Станички</div>
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infra" className="bg-forest py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Инфраструктура</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
              Всё для активной<br /><em className="italic text-gold-light">жизни за городом</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {INFRA.map((item) => (
              <div
                key={item.title}
                className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl p-5 transition-colors"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-white/50 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <img
              src={IMAGES.sports}
              alt="Спортивная зона"
              className="rounded-xl w-full object-cover aspect-video"
            />
            <img
              src={IMAGES.aerial1}
              alt="Панорама посёлка"
              className="rounded-xl w-full object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Проекты домов</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight">
            Выберите свой<br /><em className="italic">дом мечты</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOUSE_PROJECTS.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl overflow-hidden border border-[#E8E5DE] hover:shadow-lg transition-shadow group">
              <div className="h-44 bg-gradient-to-br from-forest/10 to-forest/20 relative overflow-hidden">
                <img
                  src={IMAGES.entrance}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 text-forest text-xs font-semibold px-3 py-1 rounded-full">
                  {p.style}
                </div>
              </div>
              <div className="p-5">
                <div className="font-display text-xl font-semibold text-forest mb-2">{p.name}</div>
                <div className="flex items-center gap-3 text-xs text-[#888] mb-4">
                  <span>{p.area}</span>
                  <span>·</span>
                  <span>{p.rooms}</span>
                </div>
                <div className="text-forest font-bold text-lg mb-4">{p.price}</div>
                <button
                  onClick={() => scrollTo("#contacts")}
                  className="w-full border border-forest text-forest text-xs font-semibold py-2.5 rounded-lg hover:bg-forest hover:text-white transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Галерея</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight">
              Посмотрите, как<br /><em className="italic">выглядит посёлок</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative group cursor-pointer overflow-hidden rounded-xl ${i === 0 ? "col-span-2 md:col-span-2" : ""}`}
                onClick={() => setActivePhoto(i)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-72 md:h-80" : "h-52 md:h-60"}`}
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-all duration-300 flex items-end p-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="Expand" size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">{img.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10">
            <Icon name="X" size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto - 1 + GALLERY.length) % GALLERY.length); }}
          >
            <Icon name="ChevronLeft" size={36} />
          </button>
          <img
            src={GALLERY[activePhoto].url}
            alt={GALLERY[activePhoto].caption}
            className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % GALLERY.length); }}
          >
            <Icon name="ChevronRight" size={36} />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {GALLERY[activePhoto].caption}
          </p>
        </div>
      )}

      {/* CTA STRIP */}
      <section className="bg-gold py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest mb-4">
            Свободных участков становится всё меньше
          </h2>
          <p className="text-forest/70 mb-8 text-lg">
            Запишитесь на бесплатную экскурсию по посёлку — покажем всё лично
          </p>
          <button
            onClick={() => scrollTo("#contacts")}
            className="bg-forest hover:bg-forest-dark text-white font-semibold px-10 py-4 rounded-sm transition-colors"
          >
            Записаться на экскурсию
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Связаться с нами</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight mb-6">
              Оставьте заявку —<br /><em className="italic">мы перезвоним</em>
            </h2>
            <p className="text-[#555] leading-relaxed mb-10">
              Расскажем о свободных участках, проектах домов и ценах. Организуем бесплатную экскурсию по посёлку в любое удобное время.
            </p>
            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00", href: "tel:+79000000000" },
                { icon: "Mail", label: "Email", value: "info@stanvil.ru", href: "mailto:info@stanvil.ru" },
                { icon: "MapPin", label: "Адрес", value: "Смоленская обл., д. Станички, 130 км от МКАД", href: undefined },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-forest/8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as "Phone"} size={18} className="text-forest" />
                  </div>
                  <div>
                    <div className="text-xs text-[#888] mb-0.5">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-forest hover:underline">{c.value}</a>
                    ) : (
                      <span className="font-semibold text-[#1A1A1A]">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <img
                src={IMAGES.clubhouse}
                alt="Клубный дом"
                className="rounded-2xl w-full object-cover aspect-video shadow-lg"
              />
            </div>
          </div>

          <div className="bg-white border border-[#E8E5DE] rounded-2xl p-8 shadow-sm lg:sticky lg:top-24">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-5">🌲</div>
                <h3 className="font-display text-2xl font-semibold text-forest mb-3">Заявка принята!</h3>
                <p className="text-[#555]">Мы свяжемся с вами в ближайшее время и ответим на все вопросы</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-semibold text-forest mb-6">Оставить заявку</h3>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Петров"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[#E0DDD6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all bg-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-[#E0DDD6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all bg-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase tracking-wider mb-2">Что интересует? (необязательно)</label>
                  <textarea
                    rows={3}
                    placeholder="Участок, готовый дом, экскурсия..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full border border-[#E0DDD6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all bg-[#FAFAF8] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-dark text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-[#BBB] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-dark text-white/50 py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">СВ</span>
            </div>
            <span className="font-display text-lg font-semibold text-white/80">СтанВил</span>
          </div>
          <p className="text-xs text-center">Коттеджный посёлок · Смоленская область · д. Станички</p>
          <p className="text-xs">© 2025 КП «СтанВил»</p>
        </div>
      </footer>
    </div>
  );
}