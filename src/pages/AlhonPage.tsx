import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const IMAGES = {
  exterior1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/6927b8c1-ef76-4c55-8edb-18990e6f57fc.jpeg",
  exterior2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/bcf0b15f-dcd6-491a-9dbf-ce9225a15d15.jpeg",
  interior1: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/fda2da77-92b4-479f-a1b9-9cb527f35465.jpeg",
  interior2: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/1d8148c5-d8f7-43d9-abaf-2f7c8184475a.jpeg",
  plan: "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/45595a96-d14c-4e49-9c59-83ee0f01081e.jpg",
};

const GALLERY = [
  { src: IMAGES.exterior1, caption: "Главный фасад с гаражом" },
  { src: IMAGES.exterior2, caption: "Вид со стороны бассейна" },
  { src: IMAGES.interior1, caption: "Кухня-гостиная с панорамными окнами" },
  { src: IMAGES.interior2, caption: "Гостиная с камином и деревянными панелями" },
];

const SPECS = [
  { icon: "Maximize2", label: "Площадь дома", value: "159.3 м²" },
  { icon: "BedDouble", label: "Спальни", value: "3 спальни" },
  { icon: "Bath", label: "Санузлы", value: "2 санузла" },
  { icon: "Car", label: "Гараж", value: "22.7 м²" },
  { icon: "Sofa", label: "Кухня-гостиная", value: "45.3 м²" },
  { icon: "TreePine", label: "Крытая терраса", value: "22.1 м²" },
];

const ROOMS = [
  { name: "Кухня-гостиная", area: "45.3" },
  { name: "Крытая терраса", area: "22.1" },
  { name: "Спальня (master)", area: "12.2" },
  { name: "Спальня", area: "12.1" },
  { name: "Спальня", area: "10.4" },
  { name: "Санузел", area: "5.9" },
  { name: "Санузел", area: "3.4" },
  { name: "Гардероб", area: "4.1" },
  { name: "Прихожая", area: "8.2" },
  { name: "Коридор", area: "5.5" },
  { name: "Котельная", area: "5.1" },
  { name: "Кладовая", area: "2.6" },
  { name: "Гараж", area: "22.7" },
];

export default function AlhonPage() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [tab, setTab] = useState<"gallery" | "plan">("gallery");
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  const prevImg = () => setActiveImg((p) => (p === 0 ? GALLERY.length - 1 : p - 1));
  const nextImg = () => setActiveImg((p) => (p === GALLERY.length - 1 ? 0 : p + 1));

  return (
    <div className="font-body bg-[#F7F5F0] text-[#1A1A1A] min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E8E3D8]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#1C3A2A] hover:text-[#C9A84C] transition-colors"
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-medium">Назад к проектам</span>
          </button>
          <span className="font-display text-xl text-[#1C3A2A] tracking-wide">Альхон</span>
          <a
            href="#contact-form"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-[#C9A84C] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#B8933A] transition-colors"
          >
            Узнать цену
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={IMAGES.exterior1}
          alt="Дом Альхон"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#C9A84C] text-sm uppercase tracking-widest mb-2 font-medium">Проект дома</p>
            <h1 className="font-display text-4xl md:text-6xl text-white mb-3">«Альхон»</h1>
            <p className="text-white/80 text-lg mb-6">159.3 м² · 3 спальни · Современный стиль с деревом</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 backdrop-blur text-white border border-white/20 px-4 py-2 rounded-full text-sm">Готов к строительству</span>
              <span className="bg-[#C9A84C]/90 text-white px-4 py-2 rounded-full text-sm font-medium">от 14 200 000 ₽</span>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="bg-[#1C3A2A] text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SPECS.map((s) => (
              <div key={s.label} className="text-center">
                <Icon name={s.icon} size={22} className="text-[#C9A84C] mx-auto mb-2" />
                <div className="text-lg font-semibold">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY / PLAN TABS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab("gallery")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${tab === "gallery" ? "bg-[#1C3A2A] text-white" : "bg-white border border-[#E8E3D8] text-[#1A1A1A] hover:border-[#1C3A2A]"}`}
          >
            Галерея
          </button>
          <button
            onClick={() => setTab("plan")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${tab === "plan" ? "bg-[#1C3A2A] text-white" : "bg-white border border-[#E8E3D8] text-[#1A1A1A] hover:border-[#1C3A2A]"}`}
          >
            Планировка
          </button>
        </div>

        {tab === "gallery" && (
          <div>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden mb-4 h-[480px] group cursor-pointer" onClick={() => setLightbox(activeImg)}>
              <img src={GALLERY[activeImg].src} alt={GALLERY[activeImg].caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon name="Expand" size={32} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-white text-sm">{GALLERY[activeImg].caption}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {GALLERY.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-xl overflow-hidden h-24 relative transition-all ${activeImg === i ? "ring-2 ring-[#C9A84C]" : "opacity-70 hover:opacity-100"}`}
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "plan" && (
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <img src={IMAGES.plan} alt="Планировка Альхон" className="w-full rounded-xl border border-[#E8E3D8]" />
                <p className="text-center text-sm text-gray-500 mt-3">16.7 × 16.1 м — одноэтажный дом</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#1C3A2A] mb-5">Состав помещений</h3>
                <div className="space-y-2">
                  {ROOMS.map((r) => (
                    <div key={r.name + r.area} className="flex justify-between items-center py-2 border-b border-[#F0EBE0]">
                      <span className="text-sm text-[#1A1A1A]">{r.name}</span>
                      <span className="text-sm font-medium text-[#1C3A2A] tabular-nums">{r.area} м²</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#F7F5F0] rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#1C3A2A]">Итого площадь</span>
                    <span className="font-bold text-[#1C3A2A]">159.3 м²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-sm uppercase tracking-widest mb-3 font-medium">О проекте</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#1C3A2A] mb-5">Современный дом с душой</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                «Альхон» — одноэтажный дом в современном стиле с акцентами из натурального дерева. Просторная кухня-гостиная на 45 м² с большими окнами, крытая терраса для отдыха и уютная зона с камином создают атмосферу комфорта круглый год.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Три изолированные спальни, два санузла, вместительный гардероб и гараж на одну машину. Дом легко адаптируется под семью с детьми.
              </p>
              <div className="flex flex-col gap-3">
                {["Панорамные окна от пола до потолка", "Камин в гостиной", "Крытая терраса 22 м²", "Гараж встроен в проект", "Возможен бассейн во дворе"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1C3A2A] flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={IMAGES.interior1} alt="Интерьер" className="rounded-2xl w-full h-80 object-cover shadow-lg" />
              <img src={IMAGES.interior2} alt="Гостиная" className="rounded-2xl w-48 h-36 object-cover shadow-xl border-4 border-white absolute -bottom-6 -left-6" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C3A2A] py-10 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-white/70 text-sm mb-2">Осталось 2 участка под этот проект</p>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Забронируйте участок сегодня</h3>
          <a
            href="#contact-form"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block bg-[#C9A84C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#B8933A] transition-colors"
          >
            Оставить заявку
          </a>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#C9A84C] text-sm uppercase tracking-widest mb-3 font-medium">Связаться с нами</p>
            <h2 className="font-display text-3xl text-[#1C3A2A] mb-4">Узнайте точную стоимость</h2>
            <p className="text-gray-600 mb-8">Ответим в течение часа, расскажем о доступных участках и условиях строительства.</p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C3A2A]/10 flex items-center justify-center">
                  <Icon name="Phone" size={18} className="text-[#1C3A2A]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Телефон</p>
                  <a href="tel:+79000000000" className="font-medium text-[#1C3A2A] hover:text-[#C9A84C] transition-colors">+7 (900) 000-00-00</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C3A2A]/10 flex items-center justify-center">
                  <Icon name="Mail" size={18} className="text-[#1C3A2A]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href="mailto:info@stanvil.ru" className="font-medium text-[#1C3A2A] hover:text-[#C9A84C] transition-colors">info@stanvil.ru</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C3A2A]/10 flex items-center justify-center">
                  <Icon name="MapPin" size={18} className="text-[#1C3A2A]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Адрес</p>
                  <p className="font-medium text-[#1C3A2A]">Смоленская область</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E3D8] p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#1C3A2A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-[#1C3A2A]" />
                </div>
                <h3 className="font-display text-2xl text-[#1C3A2A] mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600 text-sm">Мы свяжемся с вами в течение часа</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full border border-[#E8E3D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C3A2A]/30 focus:border-[#1C3A2A] transition-colors bg-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (900) 000-00-00"
                    className="w-full border border-[#E8E3D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C3A2A]/30 focus:border-[#1C3A2A] transition-colors bg-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Комментарий</label>
                  <textarea
                    rows={3}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Вопросы, пожелания..."
                    className="w-full border border-[#E8E3D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C3A2A]/30 focus:border-[#1C3A2A] transition-colors bg-[#FAFAF8] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#C9A84C] text-white py-3.5 rounded-xl font-medium hover:bg-[#B8933A] transition-colors disabled:opacity-60"
                >
                  {sending ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-center text-xs text-gray-400">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C3A2A] text-white/60 text-center py-6 text-xs">
        © 2024 Коттеджный посёлок · Проект «Альхон»
      </footer>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors" onClick={() => setLightbox(null)}>
            <Icon name="X" size={28} />
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l === 0 ? GALLERY.length - 1 : (l ?? 0) - 1)); }}
          >
            <Icon name="ChevronLeft" size={36} />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].caption}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) === GALLERY.length - 1 ? 0 : (l ?? 0) + 1)); }}
          >
            <Icon name="ChevronRight" size={36} />
          </button>
          <div className="absolute bottom-5 text-white/60 text-sm">{lightbox + 1} / {GALLERY.length}</div>
        </div>
      )}
    </div>
  );
}