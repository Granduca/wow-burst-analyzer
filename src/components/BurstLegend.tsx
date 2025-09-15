import React from 'react';

export const BurstLegend: React.FC = () => {
  return (
    <div className="bg-bg-tertiary rounded-lg p-4 border border-border">
      <h4 className="text-sm font-medium text-text-secondary mb-3 text-center">Легенда</h4>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded-full bg-burst-small"></div>
          <span className="text-text-secondary">Малый бурст</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded-full bg-burst-combined"></div>
          <span className="text-text-secondary">Комбинированный</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded-full bg-burst-large"></div>
          <span className="text-text-secondary">Большой бурст</span>
        </div>
      </div>
    </div>
  );
};

