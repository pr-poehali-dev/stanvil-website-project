import { useState } from "react";
import Icon from "@/components/ui/icon";

const CLUBHOUSE_IMAGE = "https://cdn.poehali.dev/projects/8ca9811b-8e00-48a5-b9c5-c37bfe54bf8b/bucket/c84777e9-5fab-4432-9720-3ea147a52032.jpg";

const CONTACTS = [
  { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00", href: "tel:+79000000000" },
  { icon: "Mail", label: "Email", value: "info@stanvil.ru", href: "mailto:info@stanvil.ru" },
  { icon: "MapPin", label: "Адрес", value: "Смоленская обл., Смоленский р-н, д. Станички", href: undefined },
];

interface ContactSectionProps {
  scrollTo: (href: string) => void;
}

export default function ContactSection({ scrollTo }: ContactSectionProps) {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
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
              {CONTACTS.map((c) => (
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
            <div className="mt-10 rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=32.041000%2C54.719724&z=16&pt=32.041000%2C54.719724,pm2rdm~%D0%9A%D0%9F+%D0%A1%D1%82%D0%B0%D0%BD%D0%92%D0%B8%D0%BB%D0%BB"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Карта посёлка СтанВилл"
                style={{ border: 0 }}
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
            <span className="font-display text-lg font-semibold text-white/80">СтанВилл</span>
          </div>
          <p className="text-xs text-center">Коттеджный посёлок · Смоленский район · д. Станички</p>
          <p className="text-xs">© 2025 КП «СтанВилл»</p>
        </div>
      </footer>
    </>
  );
}