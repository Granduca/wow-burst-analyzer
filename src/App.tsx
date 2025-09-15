import { useState, useMemo } from 'react';
import { BurstConfig } from './types';
import { calculateBurstsStrategy1, calculateBurstsStrategy2 } from './utils/burstCalculations';
import { ControlsPanel } from './components/ControlsPanel';
import { StrategyChart } from './components/StrategyChart';
import { BurstLegend } from './components/BurstLegend';

const initialConfig: BurstConfig = {
  keyDuration: 27,
  smallCooldown: 45,
  largeCooldown: 90,
  minDelay: 5,
  maxDelay: 15
};

function App() {
  const [config, setConfig] = useState<BurstConfig>(initialConfig);

  // Вычисляем результаты для обеих стратегий
  const strategy1Result = useMemo(() => calculateBurstsStrategy1(config), [config]);
  const strategy2Result = useMemo(() => calculateBurstsStrategy2(config), [config]);

  // Вычисляем разницу в эффективности
  const efficiencyDifference = useMemo(() => {
    return strategy1Result.summary.totalCount - strategy2Result.summary.totalCount;
  }, [strategy1Result.summary.totalCount, strategy2Result.summary.totalCount]);

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Controls */}
        <ControlsPanel config={config} onConfigChange={setConfig} />

        {/* Strategy 1 */}
        <StrategyChart
          title="Стратегия 1: По кулдауну"
          description="Оба бурста используются сразу, затем по кулдауну до конца ключа"
          result={strategy1Result}
          keyDurationMinutes={config.keyDuration}
          smallCooldown={config.smallCooldown}
          largeCooldown={config.largeCooldown}
        />

        {/* Strategy 2 */}
        <StrategyChart
          title="Стратегия 2: С задержками"
          description="Малый бурст сразу, затем чередуются малый и малый+большой с задержками"
          result={strategy2Result}
          keyDurationMinutes={config.keyDuration}
          smallCooldown={config.smallCooldown}
          largeCooldown={config.largeCooldown}
        />

        {/* Comparison */}
        <div className="bg-bg-primary border border-border rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Сравнение эффективности
            </h3>
            
            <div className="flex items-center justify-center gap-8 text-2xl font-bold">
              <div className="text-primary">
                {efficiencyDifference > 0 ? '+' : ''}{efficiencyDifference} всего
              </div>
              <div className="text-burst-combined">
                {strategy1Result.summary.combinedCount - strategy2Result.summary.combinedCount > 0 ? '+' : ''}
                {strategy1Result.summary.combinedCount - strategy2Result.summary.combinedCount} комбинированный
              </div>
              <div className="text-burst-small">
                {strategy1Result.summary.smallCount - strategy2Result.summary.smallCount > 0 ? '+' : ''}
                {strategy1Result.summary.smallCount - strategy2Result.summary.smallCount} малых
              </div>
              <div className="text-burst-large">
                {strategy1Result.summary.largeCount - strategy2Result.summary.largeCount > 0 ? '+' : ''}
                {strategy1Result.summary.largeCount - strategy2Result.summary.largeCount} больших
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <BurstLegend />
      </div>
    </div>
  );
}

export default App;

