import React, { useRef, useCallback, useEffect, useState } from 'react';

interface DraggableSliderProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
  color?: string;
  showValue?: boolean;
  formatValue?: (v: number) => string;
}

const DraggableSlider: React.FC<DraggableSliderProps> = ({
  min, max, value, step = 1, onChange, label, unit = '', color = '#3b82f6',
  showValue = true, formatValue,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [hovering, setHovering] = useState(false);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const round = (v: number) => step < 1 ? Math.round(v / step) * step : Math.round(v / step) * step;
  const pct = ((value - min) / (max - min)) * 100;
  const displayVal = formatValue ? formatValue(value) : `${value}${unit}`;

  const getValueFromEvent = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(round(min + ratio * (max - min)));
  }, [min, max, step, value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    onChange(getValueFromEvent(e.clientX));

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      onChange(getValueFromEvent(e.clientX));
    };
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    onChange(getValueFromEvent(e.touches[0].clientX));

    const onMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      onChange(getValueFromEvent(e.touches[0].clientX));
    };
    const onEnd = () => {
      isDragging.current = false;
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  };

  // Click anywhere on track
  const handleTrackClick = (e: React.MouseEvent) => {
    onChange(getValueFromEvent(e.clientX));
  };

  return (
    <div className="select-none w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        {showValue && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '25', color: color }}>
            {displayVal}
          </span>
        )}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-5 flex items-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleTrackClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Track background */}
        <div className="absolute w-full h-2 rounded-full bg-white/10" />

        {/* Filled portion */}
        <div
          className="absolute h-2 rounded-full transition-none"
          style={{ width: `${pct}%`, backgroundColor: color, boxShadow: hovering ? `0 0 8px ${color}60` : 'none' }}
        />

        {/* Knob */}
        <div
          className="absolute w-5 h-5 rounded-full border-2 shadow-lg transition-transform duration-75"
          style={{
            left: `calc(${pct}% - 10px)`,
            backgroundColor: 'white',
            borderColor: color,
            boxShadow: `0 0 0 ${hovering ? 4 : 2}px ${color}40`,
            transform: hovering ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-600">{min}{unit}</span>
        <span className="text-[10px] text-gray-600">{max}{unit}</span>
      </div>
    </div>
  );
};

export default DraggableSlider;
