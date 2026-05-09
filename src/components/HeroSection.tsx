import { useState } from "react";
import Icon from "@/components/ui/icon";

type HouseTab = "renders" | "plan";

const IMAGES = {
  entrance: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4fe7e409-5218-43f1-8195-ac3868313d18.jpg",
  aerial1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/34cebcf8-81f7-40bc-b51c-7ff2f72e3408.jpg",
  sports: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/670b367f-605c-4a15-a6ce-933866ffc4e9.jpg",
  aerial2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/7ddc370c-b570-468c-9374-047c6ba33e46.jpg",
};

const FEATURES = [
  { icon: "Home", title: "Современные дома", desc: "Каждый коттедж проектировался с вниманием к деталям: панорамные окна с видом на лес, тёплые материалы, продуманные планировки" },
  { icon: "Shield", title: "Охраняемая территория", desc: "КПП с шлагбаумом, видеонаблюдение 24/7, ограждение по периметру" },
  { icon: "Zap", title: "Все коммуникации", desc: "Газ, электричество 15 кВт, центральный водопровод, канализация, интернет" },
  { icon: "Car", title: "Дороги и тротуары", desc: "Асфальт, тротуары, уличное освещение и парковочные карманы" },
];

const INFRA = [
  { emoji: "🎾", title: "Падел-теннис", desc: "2 крытых корта", img: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4ef1f55b-e8bb-4db5-b286-24fb6a28e87c.jpg" },
  { emoji: "⚽", title: "Футбольное поле", desc: "С искусственным газоном", img: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/ce8f889c-cc99-4c7f-9063-6eae46adab43.jpg" },
  { emoji: "🚲", title: "Памп-трек", desc: "Для детей и взрослых", img: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/454fc674-53ba-4a8c-8a43-450f557683d3.jpg" },
  { emoji: "🛝", title: "Детская площадка", desc: "Современная игровая зона", img: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/85f80c88-fc68-4f34-9017-a0859d43b7d8.jpg" },
  { emoji: "🌳", title: "Парковые аллеи", desc: "Зоны отдыха и прогулок", img: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/85e89c8c-e864-4b30-91d6-2153a83663c3.jpg" },
];

const HOUSE_PROJECTS = [
  {
    name: "«Прайм»",
    area: "189.1 м²",
    rooms: "4 спальни",
    price: "от 17 900 000 ₽",
    style: "Современный",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/de56edfd-d810-4bf0-8db6-9fc48580d4ea.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/38e2b585-c695-43de-91d9-680bda60042e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/05e12120-8957-4508-93c1-2cafe9aa01ed.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/dc402d3e-bc90-4253-b5c8-af112823a5cd.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/0348c792-417a-498d-a595-0a4b5e3cc266.jpg",
    specs: ["Крытая терраса 11.7 м²", "Кухня-гостиная 52.3 м²", "Гараж на 2 авто 37.4 м²", "4 спальни + санузлы", "Дом построен, готов к просмотру"],
  },
  {
    name: "«Альконт»",
    area: "216.3 м²",
    rooms: "3 спальни",
    price: "от 17 100 000 ₽",
    style: "Современный",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/f1be19bd-5843-47b0-af3e-c2396fccc9ba.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/1deac89e-8a70-4d35-904b-2fd0ecd8710e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/7805030f-318c-4c4a-8b9b-d6ab17a8e5fa.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/88fe6345-9752-4630-b172-7e9aebcf3a1e.jpg",
    specs: ["Гостиная-кухня 43.7 м²", "Терраса 22.7 м²", "Гараж + навес 30.1 / 36.6 м²", "3 спальни + санузел", "Дом построен, готов к просмотру"],
  },
  {
    name: "«Дакота»",
    area: "122.6 м²",
    rooms: "3 спальни",
    price: "от 10 900 000 ₽",
    style: "Современный",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/046b0472-13a3-4111-a98e-76e20b8cc7e8.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/5741911c-04e5-4353-aa26-30c743c803ba.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/d7e0e58a-8494-48e6-a8f1-a6eede8f0fbc.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/4f03afe4-93ca-4643-8e8c-b19cfc4043d6.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/9bdbd6c1-54ee-408a-b62f-22f282861e68.jpg",
    specs: ["Кухня-гостиная 37.7 м²", "Терраса 16.9 м²", "3 спальни + санузел", "Дом построен, готов к просмотру"],
  },
  {
    name: "«Микеа 3»",
    area: "158.2 м²",
    rooms: "3 спальни",
    price: "от 11 700 000 ₽",
    style: "Скандинавский",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/60e999d3-2b15-44cc-89ea-c07b73477ff6.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/199451db-4ad1-47e2-9a37-fdf44646a469.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/8e25f9fc-bce0-4ee2-b887-328e60b7004e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/82e08c28-94f2-4998-b208-19802becc120.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/8e6dd854-7e7a-4977-b63b-74a01b93acc2.jpg",
    specs: ["Кухня-гостиная 33.2 м²", "Крытая терраса 18 м²", "Открытая терраса 34.5 м²", "3 спальни + 2 санузла", "Дом построен, готов к просмотру"],
  },
  {
    name: "«Микеа 5»",
    area: "208.7 м²",
    rooms: "3 спальни",
    price: "от 14 800 000 ₽",
    style: "Скандинавский",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/6df2b88c-5e14-4c6d-9acc-cce852131fd9.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/0afae8ad-af7a-4e65-aaeb-ec1cd0962826.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/dd65ab0a-a72e-407d-b8b9-e73d70c72f11.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/15c45de4-f4c2-4734-8d69-e27655f77101.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/673953e5-2c24-4a6f-acd4-ae4b440acced.jpg",
    specs: ["Кухня-гостиная с вторым светом 44.5 м²", "Крытая терраса 21.9 м²", "Открытая терраса 52.6 м²", "3 спальни + 2 санузла", "Дом построен, готов к просмотру"],
  },
  {
    name: "«Озёрный»",
    area: "166.5 м²",
    rooms: "4 спальни",
    price: "от 15 800 000 ₽",
    style: "Классический",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/fb3575c8-7caf-4664-a2d5-34bf3107143e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/7ad57b58-95e1-42b5-9125-b524368cd0f3.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/a7502bd2-bf69-4177-ae84-43d2cfcbacef.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/3f668c71-7d02-4f03-8dc4-a5dabd9eaf0f.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/e9b5a663-d03d-45e1-bb80-b519b6cf1491.jpg",
    specs: ["Кухня-гостиная 37.6 м²", "Крытая терраса 16.9 м²", "4 спальни + 3 санузла", "Дом на стадии строительства", "Сдача в 4 кв. 2026 года"],
  },
  {
    name: "«Гарден»",
    area: "188.5 м²",
    rooms: "2 спальни",
    price: "от 17 600 000 ₽",
    style: "Лофт",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/ea83e186-f871-442e-946d-f42a39cdfb0e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/a0be9edb-15c1-474f-bead-562d7bcf422a.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/d6fd6de5-00e6-40bf-b8f2-0687df03db73.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/349b1dd3-8570-4f80-bc68-b423f48493ac.jpg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/179ff56a-821a-4ecb-a8e0-c774fd843b2b.jpg",
    specs: ["Кухня-гостиная 41.9 м²", "Зимний сад / библиотека 10.2 м²", "Крытая терраса 44.8 м²", "2 спальни + кабинет", "Дом на стадии строительства", "Сдача в 4 кв. 2026 года"],
  },
  {
    name: "«Алхон»",
    area: "156.2 м²",
    rooms: "3 спальни",
    price: "от 14 800 000 ₽",
    style: "Современный",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/e50e1a27-c035-47eb-8249-eb7e5d197387.jpeg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/ae4d1d09-7aa8-494f-b161-39d217c9ba87.jpeg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/2beafc70-49e5-4f07-946b-d6e1d4828fb5.jpeg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/a0407cd7-ebea-421c-bcf9-704cfa9ba79b.jpeg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/9dda4685-c528-4ddf-941f-4249de04dec1.jpg",
    specs: ["Кухня-гостиная 45.3 м²", "Крытая терраса 22.1 м²", "Гараж 22.7 м²", "3 спальни + 2 санузла", "Дом на стадии строительства", "Сдача в 4 кв. 2026 года"],
  },
  {
    name: "«Гестола»",
    area: "127.7 м²",
    rooms: "3 спальни",
    price: "от 11 900 000 ₽",
    style: "Современный",
    renders: [
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/585e7cb9-5b52-4b04-be34-40f500b4b53e.jpg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/3a3485d6-b777-43b2-81eb-552f89809476.jpeg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/05cb13d2-bfdc-4a2e-8ee2-68fad9742217.jpeg",
      "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/23ae44c2-af55-4fd4-90df-ef9b11ce4e71.jpeg",
    ],
    plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/92528281-1a09-4349-9b98-2f790a0d85f6.jpg",
    specs: ["Кухня-гостиная 43.4 м²", "Крытая терраса 9.9 м²", "Крыльцо 5.2 м²", "3 спальни + 2 санузла", "Гардероб 5.2 м²", "Дом построен, готов к просмотру"],
  },
];

const MAP_IMG = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/ae22822e-9627-4958-83f3-71cf2b58b451.jpg";

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
    <>
    <div className="relative w-full rounded-2xl overflow-hidden select-none" style={{ aspectRatio: "1270/900" }}>
      <img
        src={MAP_IMG}
        alt="Карта инфраструктуры посёлка Станички парк"
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
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {MAP_PINS.map((pin) => (
        <button
          key={pin.id}
          onClick={() => setActive(active === pin.id ? null : pin.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
            active === pin.id
              ? "bg-gold/15 border-gold"
              : "bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/30"
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${active === pin.id ? "bg-gold" : "bg-white/15"}`}>
            <Icon name={pin.icon as "ShieldCheck"} size={15} className="text-white" />
          </div>
          <div>
            <div className="text-white/40 text-[10px] leading-none mb-0.5">{pin.id}</div>
            <div className="text-white text-xs font-medium leading-snug">{pin.title}</div>
          </div>
        </button>
      ))}
    </div>
    </>
  );
}

interface HeroSectionProps {
  heroOffset: number;
  scrollTo: (href: string) => void;
}

export default function HeroSection({ heroOffset, scrollTo }: HeroSectionProps) {
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img
          src={IMAGES.aerial2}
          alt="КП Станички парк с высоты"
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom origin-center"
          style={{ transform: `scale(1.08) translateY(${heroOffset}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F15]/90 via-[#0D1F15]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <img
              src="https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/bbaa3488-b579-408d-a41e-62525dce7cb8.png"
              alt="СтанВилл"
              className="w-48 md:w-64 mb-4 drop-shadow-lg"
            />
            <p className="text-gold font-semibold text-xs tracking-[0.25em] uppercase mb-5">
              Коттеджный посёлок · Смоленский район
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] mb-6">
              Загородная жизнь,<br />
              <em className="italic text-gold-light">со всеми удобствами</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
              Представляем вашему вниманию новый коттеджный посёлок Станички парк, в окружении леса, в районе деревни Станички. Современные проекты домов, просторные участки. Все коммуникации и сопутствующая инфраструктура для комфортной жизни.
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
            { value: "12 соток", label: "участки" },
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
              СтанВилл — современный посёлок с богатой инфраструктурой всего в 15 минутах езды от центра Смоленска, по пр-ту Гагарина — Киевскому шоссе. Уютная атмосфера леса, единый архитектурный стиль домов и зон отдыха, спортивные и детские площадки — всё это главные составляющие комфортной и гармоничной жизни, без городского шума и суеты.
            </p>
            <p className="text-[#555] leading-relaxed mb-8">
              Мы строим качественные подъездные пути с асфальтовым покрытием. До ближайших торговых центров 5 минут езды. Школьный автобус останавливается в 100 метрах от границ посёлка СтанВилл. На сегодняшний день уже построено несколько домов, также есть свободные участки — приглашаем на экскурсию.
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
                className="relative rounded-xl overflow-hidden group cursor-pointer h-44"
                onClick={() => setLightbox({ img: item.img, title: item.title })}
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

          {lightbox && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-5 right-5 bg-white/15 hover:bg-white/25 rounded-full p-2 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <Icon name="X" size={24} className="text-white" />
              </button>
              <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <img
                  src={lightbox.img}
                  alt={lightbox.title}
                  className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                />
                <p className="text-white/80 text-center mt-4 text-sm font-medium">{lightbox.title}</p>
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

interface ProjectsSectionProps {
  scrollTo: (href: string) => void;
}

function ProjectsSection({ scrollTo }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<Record<number, HouseTab>>({});
  const [activeRender, setActiveRender] = useState<Record<number, number>>({});
  const [projectLightbox, setProjectLightbox] = useState<{ imgs: string[]; idx: number } | null>(null);

  const getTab = (i: number): HouseTab => activeTab[i] ?? "renders";
  const getRenderIdx = (i: number) => activeRender[i] ?? 0;

  const openLightbox = (imgs: string[], idx: number) => setProjectLightbox({ imgs, idx });
  const closeLightbox = () => setProjectLightbox(null);
  const prevImg = () => setProjectLightbox(prev => prev ? { ...prev, idx: (prev.idx - 1 + prev.imgs.length) % prev.imgs.length } : prev);
  const nextImg = () => setProjectLightbox(prev => prev ? { ...prev, idx: (prev.idx + 1) % prev.imgs.length } : prev);

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
            return (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden border border-[#E8E5DE] hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img
                    src={currentImg}
                    alt={p.name}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 cursor-zoom-in ${tab === "plan" ? "object-contain bg-[#f5f4f1] p-2" : "object-cover"}`}
                    onClick={() => openLightbox(allImgs, tab === "plan" && p.plan ? p.renders.length : renderIdx)}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 text-forest text-xs font-semibold px-3 py-1 rounded-full">
                    {p.style}
                  </div>
                  {tab === "renders" && p.renders.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {p.renders.map((_, ri) => (
                        <button
                          key={ri}
                          onClick={() => setActiveRender(prev => ({ ...prev, [i]: ri }))}
                          className={`w-2 h-2 rounded-full transition-colors ${ri === renderIdx ? "bg-white" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
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
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-3 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); prevImg(); }}
                >
                  <Icon name="ChevronLeft" size={24} className="text-white" />
                </button>
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 rounded-full p-3 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); nextImg(); }}
                >
                  <Icon name="ChevronRight" size={24} className="text-white" />
                </button>
              </>
            )}
            <div className="max-w-5xl w-full mx-16" onClick={(e) => e.stopPropagation()}>
              <img
                src={projectLightbox.imgs[projectLightbox.idx]}
                alt="Проект дома"
                className="w-full max-h-[85vh] object-contain rounded-2xl"
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