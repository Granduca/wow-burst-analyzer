import React from 'react';
import { BurstConfig } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlsPanelProps {
  config: BurstConfig;
  onConfigChange: (config: BurstConfig) => void;
}

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (value: string) => void;
  min: number;
  max: number;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, value, onChange, min, max, className = '' }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(String(value + 1));
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(String(value - 1));
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-text-secondary" />
      </button>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className={`border border-border rounded-lg px-2 py-2 text-center text-text-primary bg-bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-text-muted w-16 ${className}`}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 text-text-secondary" />
      </button>
    </div>
  );
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ config, onConfigChange }) => {
  const handleInputChange = (field: keyof BurstConfig, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      onConfigChange({
        ...config,
        [field]: numValue
      });
    }
  };

  return (
    <div className="bg-bg-primary border border-border rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <label htmlFor="keyDuration" className="mb-2 text-sm font-medium text-text-secondary">
            Длительность ключа (мин)
          </label>
          <NumberInput
            id="keyDuration"
            value={config.keyDuration}
            onChange={(value) => handleInputChange('keyDuration', value)}
            min={5}
            max={60}
            className="focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="smallCooldown" className="mb-2 text-sm font-medium text-text-secondary">
            Малый бурст (сек)
          </label>
          <NumberInput
            id="smallCooldown"
            value={config.smallCooldown}
            onChange={(value) => handleInputChange('smallCooldown', value)}
            min={10}
            max={120}
            className="focus:ring-burst-small focus:border-burst-small"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="largeCooldown" className="mb-2 text-sm font-medium text-text-secondary">
            Большой бурст (сек)
          </label>
          <NumberInput
            id="largeCooldown"
            value={config.largeCooldown}
            onChange={(value) => handleInputChange('largeCooldown', value)}
            min={30}
            max={300}
            className="focus:ring-burst-large focus:border-burst-large"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="minDelay" className="mb-2 text-sm font-medium text-text-secondary">
            Мин. задержка (сек)
          </label>
          <NumberInput
            id="minDelay"
            value={config.minDelay}
            onChange={(value) => handleInputChange('minDelay', value)}
            min={0}
            max={30}
            className="focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxDelay" className="mb-2 text-sm font-medium text-text-secondary">
            Макс. задержка (сек)
          </label>
          <NumberInput
            id="maxDelay"
            value={config.maxDelay}
            onChange={(value) => handleInputChange('maxDelay', value)}
            min={5}
            max={60}
            className="focus:ring-accent focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
};

