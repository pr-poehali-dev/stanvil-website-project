import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { IMAGES, FEATURES, INFRA } from "@/components/data/heroData";
import InfraMap from "@/components/InfraMap";
import ProjectsSection from "@/components/ProjectsSection";
import GallerySection from "@/components/GallerySection";

interface HeroSectionProps {
  heroOffset: number;
  scrollTo: (href: string) => void;
}

export default function HeroSection({ heroOffset, scrollTo }: HeroSectionProps) {
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const infraTouchStart = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox({ img: INFRA[index].img, title: INFRA[index].title });
  };
  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const i = ((lightboxIndex ?? 0) - 1 + INFRA.length) % INFRA.length;
    openLightbox(i);
  };
  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const i = ((lightboxIndex ?? 0) + 1) % INFRA.length;
    openLightbox(i);
  };
  const handleInfraTouchStart = (e: React.TouchEvent) => {
    infraTouchStart.current = e.touches[0].clientX;
  };
  const handleInfraTouchEnd = (e: React.TouchEvent) => {
    if (infraTouchStart.current === null) return;
    const diff = infraTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      const i = diff > 0
        ? ((lightboxIndex ?? 0) + 1) % INFRA.length
        : ((lightboxIndex ?? 0) - 1 + INFRA.length) % INFRA.length;
      openLightbox(i);
    }
    infraTouchStart.current = null;
  };
  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/86d83eeb-c465-4c3b-8fad-e8cce611dbca.jpg"
          alt="КП Станички парк с высоты"
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom origin-center"
          style={{ transform: `scale(1.08) translateY(${heroOffset}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F15]/90 via-[#0D1F15]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className={`max-w-2xl animate-fade-in bg-[#0D1F15]/25 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl p-4 md:p-0 inline-block w-full transition-all duration-700 md:opacity-100 md:translate-y-0 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <img
              src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/bbaa3488-b579-408d-a41e-62525dce7cb8.png"
              alt="СтанВилл"
              className="hidden md:block w-64 mb-4 drop-shadow-lg"
            />
            <p className="text-gold font-semibold text-xs tracking-[0.25em] uppercase mb-5">
              Коттеджный посёлок · Смоленский район
            </p>
            <h1 className="font-display text-[1.7rem] md:text-7xl font-light text-white leading-[1.05] mb-6">
              Загородная жизнь,<br />
              <em className="italic text-gold-light">со всеми удобствами</em>
            </h1>
            <p className="text-white text-sm md:text-lg leading-relaxed mb-0 md:mb-10 max-w-xl md:text-white/70">
              Откройте для себя мир, где утро начинается с пения птиц, а воздух наполнен свежестью и ароматом леса. Коттеджный посёлок «Станички парк» — это не просто загородная недвижимость, а философия жизни в гармонии с природой, где каждый день становится источником вдохновения.
            </p>
            <div className="hidden md:flex flex-wrap gap-4">
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
            { value: "от 12 соток", label: "участки с коммуникациями" },
            { value: "2025", label: "начало строительства посёлка" },
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
              Посёлок расположен в экологически чистом районе, рядом с деревней «Станички», в окружении лесов, создающих естественный барьер от городской суеты. Здесь царит тишина, которую нарушает лишь шелест листвы и пение птиц. В пешей доступности располагается живописное озеро «Рай», — прекрасное место для отдыха, прогулок и единения с природой.
            </p>
            <p className="text-[#555] leading-relaxed mb-5">
              Мы предлагаем современные проекты домов, в которых эстетика сочетается с функциональностью. Чистые архитектурные линии, панорамное остекление, наполняющее пространство светом, и продуманные планировки создают ощущение простора и уюта. При строительстве используются натуральные и долговечные материалы, а энергоэффективные технологии обеспечивают комфорт в любое время года. Вы можете выбрать готовый дом или приобрести участок для реализации собственного проекта мечты.
            </p>


          </div>
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/63479817-02a6-4a9f-a52c-99281a8639b1.jpg"
              alt="Улица посёлка СтанВилл"
              className="w-full rounded-2xl object-cover aspect-[4/5] shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl p-5 shadow-xl border border-[#E8E5DE]">
              <div className="font-display text-xl font-semibold text-forest">20 лет опыта застройщика</div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection activePhoto={activePhoto} setActivePhoto={setActivePhoto} />

      {/* INFRASTRUCTURE FEATURES */}
      <section id="infrastructure" className="py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Инфраструктура</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight text-forest">
              Всё для комфортной и активной<br /><em className="italic">жизни за городом</em>
            </h2>
            <p className="text-[#555] leading-relaxed max-w-3xl mx-auto mt-6">
              Продуманная инфраструктура и отличная транспортная доступность для комфортной жизни. Все коммуникации на участках и дороги с асфальтовым покрытием. Современные спортивные и детские площадки. Уютные парковые зоны и прогулочные территории для всей семьи. Наша главная цель — создавать пространства, в которых хочется жить самим. Приезжайте на экскурсию, чтобы почувствовать атмосферу посёлка и убедиться в этом лично.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-[#E8E5DE] hover:border-forest/20 transition-colors">
                <div className="w-10 h-10 bg-forest/8 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={f.icon as "TreePine"} size={20} className="text-forest" />
                </div>
                <div className="font-semibold text-sm text-[#1A1A1A] mb-2">{f.title}</div>
                <div className="text-xs text-[#888] leading-snug">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 [&>*]:w-[calc(50%-0.5rem)] md:[&>*]:w-[calc(33.333%-0.75rem)]">
            {INFRA.map((item, index) => (
              <div
                key={item.title}
                className="relative rounded-xl overflow-hidden group cursor-pointer h-44"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Icon name="ZoomIn" size={22} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-white font-semibold text-sm mb-0.5">{item.title}</div>
                  <div className="text-white/70 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE MAP */}
      <section id="infra" className="bg-forest py-24">
        <div className="max-w-7xl mx-auto md:px-6">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Карта посёлка</p>

          </div>
          {lightbox && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
              onTouchStart={handleInfraTouchStart}
              onTouchEnd={handleInfraTouchEnd}
            >
              <button
                className="absolute top-5 right-5 bg-white/15 hover:bg-white/25 rounded-full p-2 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <Icon name="X" size={24} className="text-white" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-3 transition-colors"
                onClick={prevLightbox}
              >
                <Icon name="ChevronLeft" size={24} className="text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-3 transition-colors"
                onClick={nextLightbox}
              >
                <Icon name="ChevronRight" size={24} className="text-white" />
              </button>
              <div className="w-full md:max-w-4xl md:mx-16 h-full md:h-auto flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                  src={lightbox.img}
                  alt={lightbox.title}
                  className="w-full max-h-[100dvh] md:max-h-[80vh] object-contain"
                />
                <p className="text-white/80 text-center mt-4 text-sm font-medium">{lightbox.title}</p>
                <p className="text-white/40 text-center text-xs mt-1">{(lightboxIndex ?? 0) + 1} / {INFRA.length}</p>
              </div>
            </div>
          )}
          <InfraMap />
        </div>
      </section>

      {/* PROJECTS */}
      <ProjectsSection scrollTo={scrollTo} />
    </>
  );
}