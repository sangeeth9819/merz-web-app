"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAmountVisibility } from "@/contexts/amount-visibility-context";

export function AccountBalance() {
  const { isAmountVisible } = useAmountVisibility();
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; date: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const x = (mouseX / rect.width) * 800;
    
    // Clamp x to chart bounds
    if (x < 0 || x > 800) return;
    
    // Calculate Y position on the curve for this exact X
    const y = getCurveYAtX(x);
    
    // Calculate approximate value based on Y position (inverted scale)
    const maxValue = 3300000;
    const minValue = 3100000;
    const value = maxValue - ((y / 200) * (maxValue - minValue));
    
    // Get approximate date based on X position
    const date = getDateAtX(x);
    
    setHoveredPoint({ x, y, value, date });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Calculate Y position on the curve for given X using bezier curve approximation
  const getCurveYAtX = (x: number): number => {
    if (x <= 200) {
      // First segment: M0,120 C80,110 120,100 200,70
      const t = x / 200;
      return cubicBezier(120, 110, 100, 70, t);
    } else if (x <= 400) {
      // Second segment: 200,70 C280,40 320,80 400,90
      const t = (x - 200) / 200;
      return cubicBezier(70, 40, 80, 90, t);
    } else if (x <= 520) {
      // Third segment: 400,90 C450,95 470,40 520,45
      const t = (x - 400) / 120;
      return cubicBezier(90, 95, 40, 45, t);
    } else if (x <= 680) {
      // Fourth segment: 520,45 C570,50 600,80 680,65
      const t = (x - 520) / 160;
      return cubicBezier(45, 50, 80, 65, t);
    } else {
      // Fifth segment: 680,65 C730,55 770,30 800,25
      const t = (x - 680) / 120;
      return cubicBezier(65, 55, 30, 25, t);
    }
  };

  // Cubic bezier interpolation
  const cubicBezier = (p0: number, p1: number, p2: number, p3: number, t: number): number => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    
    return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
  };

  const getDateAtX = (x: number): string => {
    const dates = ["20 Oct", "25 Oct", "30 Oct", "5 Nov", "10 Nov", "15 Nov", "20 Nov"];
    const datePositions = [0, 133, 267, 400, 520, 640, 800];
    
    for (let i = 0; i < datePositions.length - 1; i++) {
      if (x >= datePositions[i] && x <= datePositions[i + 1]) {
        return dates[i];
      }
    }
    return dates[dates.length - 1];
  };

  const formatCurrency = (value: number) => {
    return `LKR ${(value / 1000).toFixed(1)}K`;
  };

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-neutral-900 transition-colors duration-300">
      <CardHeader className="pb-4">
        <CardDescription className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Account Balance</CardDescription>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            {isAmountVisible ? (
              <>
                LKR 3,216,470<sup className="text-base md:text-lg">.46</sup>
              </>
            ) : (
              "LKR ******"
            )}
          </CardTitle>
          <select className="rounded-lg border-0 bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer w-full sm:w-auto">
            <option>Last 30d</option>
            <option>Last 60d</option>
            <option>Last 90d</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div 
          className="h-48 md:h-64 w-full rounded-lg relative overflow-hidden bg-white dark:bg-neutral-900 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg ref={svgRef} className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(79, 209, 197)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(79, 209, 197)" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            
            {/* Smooth area fill */}
            <path
              d="M0,120 C80,110 120,100 200,70 C280,40 320,80 400,90 C450,95 470,40 520,45 C570,50 600,80 680,65 C730,55 770,30 800,25 L800,200 L0,200 Z"
              fill="url(#areaGradient)"
            />
            
            {/* Smooth line */}
            <path
              d="M0,120 C80,110 120,100 200,70 C280,40 320,80 400,90 C450,95 470,40 520,45 C570,50 600,80 680,65 C730,55 770,30 800,25"
              fill="none"
              stroke="rgb(79, 209, 197)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Dynamic vertical dashed line at hover point */}
            {hoveredPoint && (
              <>
                <line
                  x1={hoveredPoint.x}
                  y1={hoveredPoint.y}
                  x2={hoveredPoint.x}
                  y2="200"
                  stroke="rgb(156, 163, 175)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                
                {/* Simple clean circle indicator */}
                <circle
                  cx={hoveredPoint.x}
                  cy={hoveredPoint.y}
                  r="5"
                  fill="rgb(79, 209, 197)"
                  className="drop-shadow-md"
                />
              </>
            )}
          </svg>
          
          {/* Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute bg-slate-900/95 backdrop-blur-sm dark:bg-slate-800/95 text-white px-3 py-2 rounded-lg shadow-2xl text-xs pointer-events-none z-10 border border-slate-700/50"
              style={{
                left: `min(max(10%, ${(hoveredPoint.x / 800) * 100}%), 90%)`,
                top: `max(10px, ${(hoveredPoint.y / 200) * 100}%)`,
                transform: hoveredPoint.x < 100 
                  ? 'translate(0, -110%)' 
                  : hoveredPoint.x > 700 
                    ? 'translate(-100%, -110%)' 
                    : 'translate(-50%, -110%)',
              }}
            >
              <div className="font-bold text-sm whitespace-nowrap">
                {isAmountVisible ? formatCurrency(hoveredPoint.value) : "LKR ******"}
              </div>
              <div className="text-[10px] text-slate-400 whitespace-nowrap mt-0.5">{hoveredPoint.date}</div>
            </div>
          )}
        </div>
        
        {/* X-axis labels */}
        <div className="mt-4 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>20 Oct</span>
          <span className="hidden sm:inline">25 Oct</span>
          <span className="hidden md:inline">30 Oct</span>
          <span className="hidden lg:inline">5 Nov</span>
          <span className="hidden lg:inline">10 Nov</span>
          <span className="hidden md:inline">15 Nov</span>
          <span>20 Nov</span>
        </div>
      </CardContent>
    </Card>
  );
}
