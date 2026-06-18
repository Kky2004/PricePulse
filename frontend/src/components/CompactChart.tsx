import { motion } from 'motion/react';
import { useState } from 'react';

interface ChartPoint {
  date: string;
  price: number;
}

interface CompactChartProps {
  data: ChartPoint[];
  strokeColor?: string;
  fillColorStart?: string;
  height?: number;
  showTooltip?: boolean;
}

export default function CompactChart({
  data,
  strokeColor = '#005648',
  fillColorStart = '#005648',
  height = 140,
  showTooltip = true
}: CompactChartProps) {
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  // Find min & max to scale the SVG points beautifully
  const prices = data.map(d => d.price);
  const minPrice = Math.min(...prices) * 0.95; // 5% padding below
  const maxPrice = Math.max(...prices) * 1.05; // 5% padding above
  const priceRange = maxPrice - minPrice || 1;

  const width = 500;
  const paddingX = 20;
  const paddingY = 20;

  // Map data to SVG coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index * (width - 2 * paddingX)) / (data.length - 1);
    const y = height - paddingY - ((d.price - minPrice) * (height - 2 * paddingY)) / priceRange;
    return { x, y, data: d, index };
  });

  // Construct SVG Path
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Use standard bezier or cubic curves for supreme smoothness
      const prev = points[i - 1];
      const curr = points[i];
      const cpX1 = prev.x + (curr.x - prev.x) / 3;
      const cpY1 = prev.y;
      const cpX2 = prev.x + 2 * (curr.x - prev.x) / 3;
      const cpY2 = curr.y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
  }

  // Path for gradient fill
  const fillD = pathD ? `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z` : '';

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        onMouseLeave={() => {
          setActivePoint(null);
          setHoverIndex(null);
        }}
      >
        <defs>
          <linearGradient id="chartGradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColorStart} stopOpacity={0.25} />
            <stop offset="100%" stopColor={fillColorStart} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Dynamic Horizontal Grid lines */}
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#eeeeee"
          strokeDasharray="4 4"
        />
        <line
          x1={0}
          y1={height - paddingY}
          x2={width}
          y2={height - paddingY}
          stroke="#eeeeee"
          strokeWidth={1}
        />

        {/* Gradient fill */}
        {fillD && (
          <path
            d={fillD}
            fill="url(#chartGradientFill)"
          />
        )}

        {/* Master Sparkline */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Hover Coordinate Line & Points */}
        {points.map((pt, idx) => {
          const isHovered = hoverIndex === idx || (hoverIndex === null && idx === points.length - 1);
          return (
            <g key={idx}>
              {/* Invisible interactive hover targets */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={24}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => {
                  setActivePoint(pt.data);
                  setHoverIndex(pt.index);
                }}
              />

              {/* Little visual dots */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? strokeColor : '#ffffff'}
                stroke={strokeColor}
                strokeWidth={2}
                className="transition-all duration-150 pointer-events-none"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip Card Overlay */}
      {showTooltip && (activePoint || points.length > 0) && (
        <div className="absolute top-2 right-4 bg-primary text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-lg flex flex-col gap-0.5 min-w-[70px] pointer-events-none transition-all">
          <span className="opacity-75 uppercase tracking-wider text-[9px]">
            {activePoint ? activePoint.date : points[points.length - 1].data.date}
          </span>
          <span className="text-sm font-sans font-extrabold text-on-primary-container">
            ${activePoint ? activePoint.price.toFixed(2) : points[points.length - 1].data.price.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
