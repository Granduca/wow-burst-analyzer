import React from 'react';
import { StrategyResult } from '../types';
import { Timeline } from './Timeline';
import { BurstSummaryComponent } from './BurstSummary';

interface StrategyChartProps {
  title: string;
  description: string;
  result: StrategyResult;
  keyDurationMinutes: number;
  smallCooldown: number;
  largeCooldown: number;
}

export const StrategyChart: React.FC<StrategyChartProps> = ({
  title,
  description,
  result,
  keyDurationMinutes,
  smallCooldown,
  largeCooldown
}) => {
  const keyDurationSeconds = keyDurationMinutes * 60;

  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      
      {/* Timeline */}
      <div className="mb-6">
        <Timeline
          bursts={result.bursts}
          keyDurationSeconds={keyDurationSeconds}
          smallCooldown={smallCooldown}
          largeCooldown={largeCooldown}
        />
      </div>
      
      {/* Summary */}
      <BurstSummaryComponent summary={result.summary} />
    </div>
  );
};

