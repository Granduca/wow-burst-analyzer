import React, { useState } from 'react';
import { BurstData, BurstType } from '../types';
import { formatTime } from '../utils/burstCalculations';

interface TimelineProps {
  bursts: BurstData;
  keyDurationSeconds: number;
  smallCooldown: number;
  largeCooldown: number;
}

export const Timeline: React.FC<TimelineProps> = ({ 
  bursts, 
  keyDurationSeconds, 
  smallCooldown, 
  largeCooldown 
}) => {
  const [hoveredBurst, setHoveredBurst] = useState<number | null>(null);

  // Создаем временные метки с подписями
  const createTimeMarkers = () => {
    const markers = [];
    const labelInterval = Math.max(smallCooldown * 2, 60); // Подписи каждые 2 малых CD или каждую минуту
    
    for (let time = 0; time <= keyDurationSeconds; time += smallCooldown) {
      const isMajor = time % largeCooldown === 0;
      const shouldShowLabel = time % labelInterval === 0 || time === 0 || time === keyDurationSeconds;
      
      markers.push(
        <div key={`marker-${time}`} className="absolute bottom-0" style={{ left: `${(time / keyDurationSeconds) * 100}%` }}>
          {/* Вертикальная линия */}
          <div
            className={`w-px ${
              isMajor ? 'h-6 bg-primary' : 'h-3 bg-border'
            }`}
          />
          {/* Подпись времени */}
          {shouldShowLabel && (
            <div className="absolute top-0 transform -translate-x-1/2 -translate-y-full">
              <div className="text-xs text-text-secondary font-mono bg-bg-primary px-2 py-1 rounded border border-border">
                {formatTime(time)}
              </div>
            </div>
          )}
        </div>
      );
    }
    return markers;
  };

  // Создаем бурсты с улучшенными tooltips
  const createBursts = () => {
    const allBursts = [...bursts.small, ...bursts.large, ...bursts.combined];
    
    return allBursts.map((burst, index) => {
      const getBurstClasses = () => {
        switch (burst.type) {
          case BurstType.SMALL:
            return 'bg-burst-small w-3 h-3 -bottom-1.5 hover:scale-110 transition-transform duration-200';
          case BurstType.LARGE:
            return 'bg-burst-large w-4 h-4 -bottom-2 hover:scale-110 transition-transform duration-200';
          case BurstType.COMBINED:
            return 'bg-burst-combined w-5 h-5 -bottom-2.5 hover:scale-110 transition-transform duration-200';
          default:
            return '';
        }
      };

      const getBurstTypeText = () => {
        switch (burst.type) {
          case BurstType.SMALL:
            return 'Малый бурст';
          case BurstType.LARGE:
            return 'Большой бурст';
          case BurstType.COMBINED:
            return 'Комбинированный бурст';
          default:
            return 'Бурст';
        }
      };

      const isHovered = hoveredBurst === index;

      return (
        <div key={`burst-${burst.time}-${index}`} className="absolute z-20" style={{ left: `${(burst.time / keyDurationSeconds) * 100}%` }}>
          {/* Бурст */}
          <div
            className={`absolute rounded-full cursor-pointer transform -translate-x-1/2 ${getBurstClasses()}`}
            onMouseEnter={() => setHoveredBurst(index)}
            onMouseLeave={() => setHoveredBurst(null)}
          />
          
          {/* Tooltip */}
          {isHovered && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
              <div className="bg-bg-primary border border-border rounded-lg px-3 py-2 min-w-max">
                <div className="text-sm font-semibold text-text-primary">
                  {getBurstTypeText()}
                </div>
                <div className="text-xs text-text-secondary">
                  Время: {formatTime(burst.time)}
                </div>
                <div className="text-xs text-text-muted">
                  Минута: {Math.floor(burst.time / 60)}
                </div>
              </div>
              {/* Стрелка */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative">
      {/* Timeline container */}
      <div className="relative h-24 bg-bg-tertiary rounded-lg border border-border p-4">
        {/* Timeline line */}
        <div className="absolute bottom-6 left-4 right-4 h-px bg-border"></div>
        
        {/* Start and end labels */}
        <div className="absolute bottom-2 left-0 text-xs text-text-muted font-mono">
          00:00
        </div>
        <div className="absolute bottom-2 right-0 text-xs text-text-muted font-mono">
          {formatTime(keyDurationSeconds)}
        </div>
        
        {/* Time markers and bursts */}
        <div className="relative h-full">
          {createTimeMarkers()}
          {createBursts()}
        </div>
      </div>
      
      {/* Timeline info */}
      <div className="flex justify-between text-xs text-text-muted mt-3">
        <span>Длительность: {formatTime(keyDurationSeconds)}</span>
        <span>Бурстов: {bursts.small.length + bursts.large.length + bursts.combined.length}</span>
      </div>
    </div>
  );
};

