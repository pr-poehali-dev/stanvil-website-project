import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MAP_IMG, MAP_PINS } from "@/components/data/heroData";

export default function InfraMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="relative w-full rounded-2xl overflow-hidden select-none" style={{ aspectRatio: "1310/900" }}>
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
                style={
                  pin.popupBelow
                    ? { top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }
                    : { bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Icon name={pin.icon as "ShieldCheck"} size={13} className="text-gold" />
                  </div>
                  <span className="font-semibold text-forest text-sm">{pin.title}</span>
                </div>
                <p className="text-xs text-[#666] leading-snug">{pin.desc}</p>
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"
                  style={pin.popupBelow ? { top: "-6px" } : { bottom: "-6px" }}
                />
              </div>
            )}
          </div>
        ))}
        {active !== null && (
          <div className="absolute inset-0" onClick={() => setActive(null)} />
        )}
      </div>
      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6 text-sm text-white/80 leading-relaxed grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-gold font-semibold mb-2">Построены и готовы к просмотру</p>
          <ul className="space-y-1 text-white/70">
            <li><span className="text-white font-medium">8.</span> «Прайм»</li>
            <li><span className="text-white font-medium">9.</span> «Микеа 3»</li>
            <li><span className="text-white font-medium">10.</span> «Микеа 5»</li>
            <li><span className="text-white font-medium">15.</span> «Альконт»</li>
            <li><span className="text-white font-medium">16.</span> «Дакота»</li>
          </ul>
        </div>
        <div>
          <p className="text-yellow-300 font-semibold mb-2">Дома в процессе строительства</p>
          <ul className="space-y-1 text-white/70">
            <li><span className="text-white font-medium">1.</span> «Премьер»</li>
            <li><span className="text-white font-medium">2.</span> «Микеа 3»</li>
            <li><span className="text-white font-medium">3.</span> «Микеа 5»</li>
            <li><span className="text-white font-medium">4.</span> «Гестола»</li>
            <li><span className="text-white font-medium">5.</span> «Гарден»</li>
            <li><span className="text-white font-medium">11.</span> «Алхон»</li>
            <li><span className="text-white font-medium">17.</span> «Павловы озёра»</li>
          </ul>
        </div>
        <div>
          <p className="text-green-400 font-semibold mb-2">Свободные участки для продажи</p>
          <p className="text-white/70">6, 7, 12, 13, 14, 18, 19, 20</p>
        </div>
        <div>
          <p className="text-white/50 font-semibold mb-2">Участки в резерве</p>
          <p className="text-white/70">21, 22, 23, 24, 25, 26</p>
        </div>
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