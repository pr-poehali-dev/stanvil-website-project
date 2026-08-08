import Icon from "@/components/ui/icon";

const CONTACTS = [
  { icon: "Phone", label: "Телефон", value: "+7 905 698-98-88", href: "tel:+79056989888" },
  { icon: "Mail", label: "Email", value: "sksmolstroi@bk.ru", href: "mailto:sksmolstroi@bk.ru" },
  { icon: "MapPin", label: "Адрес", value: "Смоленская обл., Смоленский р-н, д. Станички, ул. Дубравная", href: undefined },
];

interface ContactSectionProps {
  scrollTo: (href: string) => void;
}

export default function ContactSection({ scrollTo }: ContactSectionProps) {
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
      <section id="contacts" className="py-24 max-w-4xl mx-auto px-6">
        <div>
          <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-4">Связаться с нами</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-forest leading-tight mb-6">
            Свяжитесь с нами —<br /><em className="italic">мы всё расскажем</em>
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
              src="https://yandex.ru/map-widget/v1/?ll=32.041000%2C54.719724&z=16&pt=32.041000%2C54.719724,pm2rdm~%D0%A1%D1%82%D0%B0%D0%BD%D0%B8%D1%87%D0%BA%D0%B8+%D0%BF%D0%B0%D1%80%D0%BA"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Карта посёлка Станички парк"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-dark text-white/50 py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">СП</span>
            </div>
            <span className="font-display text-lg font-semibold text-white/80">Станички парк</span>
          </div>
          <p className="text-xs text-center">Коттеджный посёлок · Смоленский район · д. Станички</p>
          <p className="text-xs">© 2025 КП «Станички парк»</p>
        </div>
      </footer>
    </>
  );
}