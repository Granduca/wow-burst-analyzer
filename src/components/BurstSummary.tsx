import React from 'react';
import { BurstSummary } from '../types';

interface BurstSummaryProps {
  summary: BurstSummary;
}

export const BurstSummaryComponent: React.FC<BurstSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-bg-tertiary rounded-lg p-4 border border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-burst-small mb-1">
            {summary.smallCount}
          </div>
          <div className="text-sm text-text-secondary">Малых</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-burst-combined mb-1">
            {summary.combinedCount}
          </div>
          <div className="text-sm text-text-secondary">Комбинированных</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-burst-large mb-1">
            {summary.largeCount}
          </div>
          <div className="text-sm text-text-secondary">Больших</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {summary.totalCount}
          </div>
          <div className="text-sm text-text-secondary">Всего</div>
        </div>
      </div>
    </div>
  );
};

