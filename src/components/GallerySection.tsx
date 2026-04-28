import Icon from "@/components/ui/icon";

const IMAGES = {
  entrance: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4fe7e409-5218-43f1-8195-ac3868313d18.jpg",
  aerial1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/34cebcf8-81f7-40bc-b51c-7ff2f72e3408.jpg",
  sports: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/670b367f-605c-4a15-a6ce-933866ffc4e9.jpg",
  aerial2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/aaac7ed1-619f-42cc-919d-6edd2ba3d010.jpg",
  clubhouse: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/c84777e9-5fab-4432-9720-3ea147a52032.jpg",
};

const GALLERY = [
  { url: IMAGES.aerial2, caption: "Общий вид посёлка" },
  { url: IMAGES.entrance, caption: "Въезд — КПП Станички парк" },
  { url: IMAGES.aerial1, caption: "Вид с высоты птичьего полёта" },
  { url: IMAGES.sports, caption: "Спортивная зона: теннис и футбол" },
  { url: IMAGES.clubhouse, caption: "Клубный дом и парковка" },
];

interface GallerySectionProps {
  activePhoto: number | null;
  setActivePhoto: (i: number | null) => void;
}

export default function GallerySection({ activePhoto, setActivePhoto }: GallerySectionProps) {
  return (
    <>
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
    </>
  );
}