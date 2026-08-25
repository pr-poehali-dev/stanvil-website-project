import { useEffect, useRef, useState, ReactNode } from "react";

interface SwipeCarouselProps {
  index: number;
  count: number;
  onChange: (i: number) => void;
  renderItem: (i: number) => ReactNode;
  className?: string;
}

export default function SwipeCarousel({ index, count, onChange, renderItem, className = "" }: SwipeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [width, setWidth] = useState(0);
  const startX = useRef(0);
  const lockedAxis = useRef<"x" | "y" | null>(null);
  const startY = useRef(0);

  useEffect(() => {
    const measure = () => setWidth(containerRef.current?.offsetWidth || 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    lockedAxis.current = null;
    setWidth(containerRef.current?.offsetWidth || width);
    setDragging(true);
    setDragOffset(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (lockedAxis.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      lockedAxis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (lockedAxis.current !== "x") return;
    e.preventDefault();
    let diff = dx;
    if ((index === 0 && diff > 0) || (index === count - 1 && diff < 0)) {
      diff *= 0.35;
    }
    setDragOffset(diff);
  };
  const handleTouchEnd = () => {
    if (lockedAxis.current === "x") {
      const threshold = width * 0.18;
      if (dragOffset < -threshold && index < count - 1) onChange(index + 1);
      else if (dragOffset > threshold && index > 0) onChange(index - 1);
    }
    setDragging(false);
    setDragOffset(0);
    lockedAxis.current = null;
  };

  const translate = -index * width + dragOffset;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onTouchStart={count > 1 ? handleTouchStart : undefined}
      onTouchMove={count > 1 ? handleTouchMove : undefined}
      onTouchEnd={count > 1 ? handleTouchEnd : undefined}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(${translate}px)`,
          transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.22,0.61,0.36,1)",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-full shrink-0 w-full">
            {renderItem(i)}
          </div>
        ))}
      </div>
    </div>
  );
}
