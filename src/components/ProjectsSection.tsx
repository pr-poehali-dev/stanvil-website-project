import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { HOUSE_PROJECTS, HouseTab } from "@/components/data/heroData";
import SwipeCarousel from "@/components/ui/swipe-carousel";

interface ProjectsSectionProps {
  scrollTo: (href: string) => void;
}

export default function ProjectsSection({ scrollTo }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<Record<number, HouseTab>>({});
  const [activeRender, setActiveRender] = useState<Record<number, number>>({});
  const [projectLightbox, setProjectLightbox] = useState<{ imgs: string[]; idx: number } | null>(null);
  const [highlightedProject, setHighlightedProject] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      const idx = HOUSE_PROJECTS.findIndex(p => p.name === name);
      if (idx === -1) return;
      setHighlightedProject(idx);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setHighlightedProject(null), 2500);
      }, 600);
    };
    window.addEventListener("navigate-to-project", handler);
    return () => window.removeEventListener("navigate-to-project", handler);
  }, []);

  const getTab = (i: number): HouseTab => activeTab[i] ?? "renders";
  const getRenderIdx = (i: number) => activeRender[i] ?? 0;

  const openLightbox = (imgs: string[], idx: number) => setProjectLightbox({ imgs, idx });
  const closeLightbox = () => setProjectLightbox(null);
  const prevImg = () => setProjectLightbox(prev => prev ? { ...prev, idx: (prev.idx - 1 + prev.imgs.length) % prev.imgs.length } : prev);
  const nextImg = () => setProjectLightbox(prev => prev ? { ...prev, idx: (prev.idx + 1) % prev.imgs.length } : prev);

  const prevRender = (i: number, total: number) =>
    setActiveRender(prev => ({ ...prev, [i]: (getRenderIdx(i) - 1 + total) % total }));
  const nextRender = (i: number, total: number) =>
    setActiveRender(prev => ({ ...prev, [i]: (getRenderIdx(i) + 1) % total }));

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Проекты домов</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight">
          Выберите свой<br /><em className="italic">дом мечты</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {HOUSE_PROJECTS.map((p, i) => {
          const tab = getTab(i);
          const renderIdx = getRenderIdx(i);
          const allImgs = p.plan ? [...p.renders, p.plan] : p.renders;
          const currentImg = tab === "plan" && p.plan ? p.plan : p.renders[renderIdx];
          const hasMultiple = tab === "renders" && p.renders.length > 1;
          return (
            <div key={p.name} ref={el => { cardRefs.current[i] = el; }} className={`bg-white rounded-2xl overflow-hidden border transition-shadow group flex flex-col ${highlightedProject === i ? "border-gold shadow-[0_0_0_3px_rgba(180,140,60,0.35)] shadow-lg" : "border-[#E8E5DE] hover:shadow-lg"}`}>
              <div
                className="relative overflow-hidden"
                style={{ height: "220px" }}
              >
                {tab === "plan" && p.plan ? (
                  <img
                    src={currentImg}
                    alt={p.name}
                    className="w-full h-full object-contain bg-[#f5f4f1] p-2 cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                    onClick={() => openLightbox(allImgs, p.renders.length)}
                  />
                ) : (
                  <SwipeCarousel
                    index={renderIdx}
                    count={p.renders.length}
                    onChange={(ri) => setActiveRender(prev => ({ ...prev, [i]: ri }))}
                    className="w-full h-full"
                    renderItem={(ri) => (
                      <img
                        src={p.renders[ri]}
                        alt={p.name}
                        className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                        onClick={() => openLightbox(allImgs, ri)}
                      />
                    )}
                  />
                )}
                <div className="absolute top-3 right-3 bg-white/90 text-forest text-xs font-semibold px-3 py-1 rounded-full">
                  {p.style}
                </div>
                {hasMultiple && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/55 rounded-full p-1.5 transition-colors md:opacity-0 md:group-hover:opacity-100 z-10"
                      onClick={(e) => { e.stopPropagation(); prevRender(i, p.renders.length); }}
                    >
                      <Icon name="ChevronLeft" size={16} className="text-white" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/55 rounded-full p-1.5 transition-colors md:opacity-0 md:group-hover:opacity-100 z-10"
                      onClick={(e) => { e.stopPropagation(); nextRender(i, p.renders.length); }}
                    >
                      <Icon name="ChevronRight" size={16} className="text-white" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {p.renders.map((_, ri) => (
                        <button
                          key={ri}
                          onClick={(e) => { e.stopPropagation(); setActiveRender(prev => ({ ...prev, [i]: ri })); }}
                          className={`w-2 h-2 rounded-full transition-colors ${ri === renderIdx ? "bg-white" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                <button
                  className="absolute top-3 left-3 bg-black/30 hover:bg-black/50 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => openLightbox(allImgs, tab === "plan" && p.plan ? p.renders.length : renderIdx)}
                >
                  <Icon name="ZoomIn" size={14} className="text-white" />
                </button>
              </div>
              {p.plan && (
                <div className="flex border-b border-[#E8E5DE]">
                  <button
                    onClick={() => setActiveTab(prev => ({ ...prev, [i]: "renders" }))}
                    className={`flex-1 text-xs font-semibold py-2 transition-colors ${tab === "renders" ? "text-forest border-b-2 border-forest" : "text-[#888] hover:text-forest"}`}
                  >
                    Рендеры
                  </button>
                  <button
                    onClick={() => setActiveTab(prev => ({ ...prev, [i]: "plan" }))}
                    className={`flex-1 text-xs font-semibold py-2 transition-colors ${tab === "plan" ? "text-forest border-b-2 border-forest" : "text-[#888] hover:text-forest"}`}
                  >
                    Планировка
                  </button>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="font-display text-xl font-semibold text-forest mb-2">{p.name}</div>
                <div className="flex items-center gap-3 text-xs text-[#888] mb-3">
                  <span>{p.area}</span>
                  <span>·</span>
                  <span>{p.rooms}</span>
                </div>
                {p.specs.length > 0 && (
                  <ul className="mb-3 space-y-1">
                    {p.specs.map((s) => {
                      const isReady = s.includes("Дом построен");
                      return (
                        <li key={s} className={`text-xs flex items-start gap-1.5 ${isReady ? "font-semibold text-emerald-700" : "text-[#666]"}`}>
                          <span className={`mt-0.5 ${isReady ? "text-emerald-500" : "text-gold"}`}>{isReady ? "✓" : "—"}</span>
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div className="text-forest font-bold text-lg mb-4 mt-auto">{p.price}</div>
                <button
                  onClick={() => scrollTo("#contacts")}
                  className="w-full border border-forest text-forest text-xs font-semibold py-2.5 rounded-lg hover:bg-forest hover:text-white transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {projectLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 bg-white/15 hover:bg-white/25 rounded-full p-2 transition-colors z-10"
            onClick={closeLightbox}
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
          {projectLightbox.imgs.length > 1 && (
            <>
              <button
                className="hidden md:block absolute left-2 md:left-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-2 md:p-3 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
              >
                <Icon name="ChevronLeft" size={24} className="text-white" />
              </button>
              <button
                className="hidden md:block absolute right-2 md:right-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-2 md:p-3 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
              >
                <Icon name="ChevronRight" size={24} className="text-white" />
              </button>
            </>
          )}
          <div className="max-w-5xl w-full h-full md:h-auto mx-0 md:mx-16 px-0 md:px-0 flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
            <SwipeCarousel
              index={projectLightbox.idx}
              count={projectLightbox.imgs.length}
              onChange={(idx) => setProjectLightbox(prev => prev ? { ...prev, idx } : prev)}
              className="w-full h-full md:h-[75vh]"
              renderItem={(i) => (
                <img
                  src={projectLightbox.imgs[i]}
                  alt="Проект дома"
                  className="w-full h-full object-contain md:rounded-2xl"
                  draggable={false}
                />
              )}
            />
            {projectLightbox.imgs.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {projectLightbox.imgs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProjectLightbox(prev => prev ? { ...prev, idx } : prev)}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === projectLightbox.idx ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}