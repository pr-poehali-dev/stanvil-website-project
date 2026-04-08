import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  entrance: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4fe7e409-5218-43f1-8195-ac3868313d18.jpg",
  aerial1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/34cebcf8-81f7-40bc-b51c-7ff2f72e3408.jpg",
  sports: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/670b367f-605c-4a15-a6ce-933866ffc4e9.jpg",
  aerial2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/aaac7ed1-619f-42cc-919d-6edd2ba3d010.jpg",
};

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

const HOUSE_PROJECTS = [
  { name: "«Сосновый»", area: "120 м²", rooms: "3 спальни", price: "от 4 200 000 ₽", style: "Скандинавский" },
  { name: "«Дубравный»", area: "180 м²", rooms: "4 спальни", price: "от 6 800 000 ₽", style: "Современный" },
  { name: "«Боярский»", area: "260 м²", rooms: "5 спален", price: "от 11 500 000 ₽", style: "Классика" },
  { name: "«Уютный»", area: "90 м²", rooms: "2 спальни", price: "от 3 100 000 ₽", style: "Минимализм" },
];

const MAP_IMG = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/368cd561-8cfd-42c7-a284-bac573c29eb0.jpg";

const MAP_PINS = [
  {
    id: 1,
    icon: "ShieldCheck",
    title: "Въезд / КПП",
    desc: "Охраняемый въезд с шлагбаумом и видеонаблюдением",
    x: 8.5,
    y: 48,
  },
  {
    id: 2,
    icon: "Dumbbell",
    title: "Спортзона",
    desc: "Падел-теннис, футбольное поле, памп-трек",
    x: 9,
    y: 70,
  },
  {
    id: 3,
    icon: "TreePine",
    title: "Лесная зона",
    desc: "Реликтовый сосновый лес вокруг посёлка",
    x: 42,
    y: 92,
  },
  {
    id: 4,
    icon: "Footprints",
    title: "Парковая аллея",
    desc: "Благоустроенные пешеходные дорожки и зоны отдыха",
    x: 23,
    y: 72,
  },
  {
    id: 5,
    icon: "SmilePlus",
    title: "Детская площадка",
    desc: "Современная игровая зона для детей",
    x: 88,
    y: 16,
  },
];

function InfraMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden select-none" style={{ aspectRatio: "1270/900" }}>
      <img
        src={MAP_IMG}
        alt="Карта инфраструктуры посёлка СтанВил"
        className="w-full h-full object-cover"
        draggable={false}
      />
      {MAP_PINS.map((pin) => (
        <div
          key={pin.id}
          className="absolute"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <button
            onClick={() => setActive(active === pin.id ? null : pin.id)}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-lg transition-all duration-200 ${
              active === pin.id
                ? "bg-gold border-gold scale-110"
                : "bg-forest/90 border-white/60 hover:bg-gold hover:border-gold hover:scale-110"
            }`}
          >
            <Icon name={pin.icon as "ShieldCheck"} size={18} className="text-white" />
          </button>
          {active === pin.id && (
            <div
              className="absolute z-20 bg-white rounded-xl shadow-2xl p-4 w-52 text-left"
              style={{ bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                  <Icon name={pin.icon as "ShieldCheck"} size={13} className="text-gold" />
                </div>
                <span className="font-semibold text-forest text-sm">{pin.title}</span>
              </div>
              <p className="text-xs text-[#666] leading-snug">{pin.desc}</p>
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
            </div>
          )}
        </div>
      ))}
      {active !== null && (
        <div className="absolute inset-0" onClick={() => setActive(null)} />
      )}
    </div>
  );
}

interface HeroSectionProps {
  heroOffset: number;
  scrollTo: (href: string) => void;
}

export default function HeroSection({ heroOffset, scrollTo }: HeroSectionProps) {
  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img
          src={IMAGES.aerial2}
          alt="КП СтанВил с высоты"
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom origin-center"
          style={{ transform: `scale(1.08) translateY(${heroOffset}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F15]/90 via-[#0D1F15]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <img
              src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/12593637-94a6-4ac7-87ad-d77e181a3812.png"
              alt="СтанВил"
              className="w-48 md:w-64 mb-4 brightness-0 invert drop-shadow-lg"
            />
            <p className="text-gold font-semibold text-xs tracking-[0.25em] uppercase mb-5">
              Коттеджный посёлок · Смоленский район
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
            { value: "15 мин", label: "до центра Смоленска" },
            { value: "26", label: "домовладений в первой очереди строительства" },
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
              КП «СтанВил» расположен в деревне Станички Смоленского района Смоленской области — в окружении вековых сосен, вдали от городского шума, но с современной инфраструктурой.
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
              <div className="text-xs text-[#888]">Смоленская обл., Смоленский р-н, д. Станички</div>
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
          <InfraMap />
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
    </>
  );
}