import { useState } from "react";
import Icon from "@/components/ui/icon";

const GALLERY = [
  { url: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/1c305aa4-d4f4-42a0-bdae-f80e386e1ca8.jpg", caption: "Вид с высоты — спортивная зона" },
  { url: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/9992491a-31ac-44f5-a022-fc4d1c746566.jpg", caption: "Общий вид посёлка" },
  { url: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/bde6758a-db17-4d01-b5a2-f68892a8d70f.jpg", caption: "Вид с высоты — дома и улицы" },
  { url: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4e28105d-b249-4024-87e5-937a8d92e46a.jpg", caption: "Въезд — КПП Станички парк" },
  { url: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/fe20f80d-ec69-4099-8f9a-afeddcfe0d02.jpg", caption: "КПП и парковка" },
];

interface GallerySectionProps {
  activePhoto: number | null;
  setActivePhoto: (i: number | null) => void;
}

export default function GallerySection({ activePhoto, setActivePhoto }: GallerySectionProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setCurrent((current + 1) % GALLERY.length);

  return (
    <>
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Галерея</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight">
              Как будет выглядеть<br /><em className="italic">посёлок «Станички парк»</em>
            </h2>
          </div>

          {/* Главное изображение */}
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-4 cursor-pointer" onClick={() => setActivePhoto(current)}>
            <img
              key={current}
              src={GALLERY[current].url}
              alt={GALLERY[current].caption}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-5 left-6 text-white font-medium text-sm md:text-base">{GALLERY[current].caption}</p>
            <span className="absolute bottom-5 right-6 text-white/60 text-sm">{current + 1} / {GALLERY.length}</span>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <Icon name="ChevronLeft" size={24} className="text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <Icon name="ChevronRight" size={24} className="text-white" />
            </button>
          </div>

          {/* Миниатюры */}
          <div className="flex gap-2 md:gap-3">
            {GALLERY.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-1 overflow-hidden rounded-xl transition-all duration-300 ${i === current ? "ring-2 ring-gold opacity-100" : "opacity-50 hover:opacity-80"}`}
              >
                <img src={img.url} alt={img.caption} className="w-full h-14 md:h-20 object-cover" />
              </button>
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
    </>
  );
}
