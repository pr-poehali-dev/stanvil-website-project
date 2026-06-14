import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import {
  MAP_IMG,
  MAP_PINS,
  PLOT_PINS,
  PLOT_STATUS_LABEL,
  PLOT_STATUS_COLOR,
  type PlotPin,
} from "@/components/data/heroData";

const CALIBRATE = false; // поставь true чтобы увидеть координаты при клике

export default function InfraMap() {
  const [active, setActive] = useState<number | null>(null);
  const [activePlot, setActivePlot] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handlePlotClick = (plot: PlotPin) => {
    setActivePlot(activePlot === plot.id ? null : plot.id);
    setActive(null);
  };

  const handlePinClick = (id: number) => {
    setActive(active === id ? null : id);
    setActivePlot(null);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!CALIBRATE) return;
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    setCursor({ x: parseFloat(x), y: parseFloat(y) });
  };

  return (
    <>
      {/* Кнопки-фильтры над картой */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {MAP_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => handlePinClick(pin.id)}
            className={`flex items-center gap-1 md:gap-1.5 px-1.5 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-xs font-medium border transition-all duration-200 ${
              active === pin.id
                ? "bg-gold border-gold text-[#1A1A1A]"
                : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
            }`}
          >
            <Icon name={pin.icon as "ShieldCheck"} size={9} className="md:hidden" />
            <Icon name={pin.icon as "ShieldCheck"} size={13} className="hidden md:block" />
            {pin.title}
          </button>
        ))}
      </div>

      <div
        ref={mapRef}
        className="relative w-full rounded-none md:rounded-2xl overflow-hidden select-none"
        style={{ aspectRatio: "1310/900", cursor: CALIBRATE ? "crosshair" : undefined }}
        onClick={handleMapClick}
      >
        <img
          src={MAP_IMG}
          alt="Карта инфраструктуры посёлка Станички парк"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Участки */}
        {PLOT_PINS.map((plot) => {
          const color = PLOT_STATUS_COLOR[plot.status];
          const isOpen = activePlot === plot.id;
          return (
            <div
              key={plot.id}
              className="absolute"
              style={{ left: `${plot.x}%`, top: `${plot.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); handlePlotClick(plot); }}
                className="relative flex items-center justify-center w-3.5 h-3.5 md:w-7 md:h-7 rounded-sm md:rounded-md border md:border-2 shadow-md transition-all duration-200 hover:scale-110 font-bold text-[7px] md:text-[11px] text-white"
                style={{
                  backgroundColor: color,
                  borderColor: isOpen ? "#fff" : `${color}bb`,
                  boxShadow: isOpen ? `0 0 0 3px ${color}55` : undefined,
                }}
              >
                {plot.num}
              </button>
              {isOpen && (
                <div
                  className="absolute z-30 bg-white rounded-lg shadow-2xl p-2 md:p-4 w-28 md:w-52 text-left"
                  style={{ bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }}
                >
                  <div className="flex items-center gap-1 md:gap-2 mb-1">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="font-semibold text-forest text-[10px] md:text-sm leading-tight">
                      Участок {plot.num}{plot.name ? ` — ${plot.name}` : ""}
                    </span>
                  </div>
                  <p className="text-[9px] md:text-xs leading-snug" style={{ color }}>
                    {PLOT_STATUS_LABEL[plot.status]}
                  </p>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" style={{ bottom: "-6px" }} />
                </div>
              )}
            </div>
          );
        })}

        {/* Инфраструктурные пины */}
        {MAP_PINS.map((pin) => (
          <div
            key={pin.id}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handlePinClick(pin.id); }}
              className={`group relative flex items-center justify-center w-5 h-5 md:w-10 md:h-10 rounded-full border md:border-2 shadow-lg transition-all duration-200 ${
                active === pin.id
                  ? "bg-gold border-gold scale-110"
                  : "bg-forest/90 border-white/60 hover:bg-gold hover:border-gold hover:scale-110"
              }`}
            >
              <Icon name={pin.icon as "ShieldCheck"} size={9} className="text-white md:hidden" />
              <Icon name={pin.icon as "ShieldCheck"} size={18} className="text-white hidden md:block" />
            </button>
            {active === pin.id && (
              <div
                className="absolute z-20 bg-white rounded-lg md:rounded-xl shadow-2xl p-2 md:p-4 w-28 md:w-52 text-left"
                style={
                  pin.popupBelow
                    ? { top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }
                    : { bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }
                }
              >
                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Icon name={pin.icon as "ShieldCheck"} size={8} className="text-gold md:hidden" />
                    <Icon name={pin.icon as "ShieldCheck"} size={13} className="text-gold hidden md:block" />
                  </div>
                  <span className="font-semibold text-forest text-[10px] md:text-sm leading-tight">{pin.title}</span>
                </div>
                <p className="text-[9px] md:text-xs text-[#666] leading-snug">{pin.desc}</p>
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"
                  style={pin.popupBelow ? { top: "-6px" } : { bottom: "-6px" }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Калибровочный курсор */}
        {CALIBRATE && cursor && (
          <div
            className="absolute z-50 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, transform: "translate(8px, -50%)" }}
          >
            x:{cursor.x} y:{cursor.y}
          </div>
        )}

        {(active !== null || activePlot !== null) && (
          <div className="absolute inset-0" onClick={() => { setActive(null); setActivePlot(null); }} />
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


    </>
  );
}