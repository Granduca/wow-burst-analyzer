import { BurstConfig, BurstData, BurstType, Burst, StrategyResult } from '../types';

/**
 * Создает пустую структуру данных для бурстов
 */
export function createEmptyBurstData(): BurstData {
  return {
    small: [],
    large: [],
    combined: []
  };
}

/**
 * Рассчитывает статистику по бурстам
 */
export function calculateSummary(bursts: BurstData): { smallCount: number; largeCount: number; combinedCount: number; totalCount: number } {
  const smallCount = bursts.small.length;
  const largeCount = bursts.large.length;
  const combinedCount = bursts.combined.length;
  const totalCount = smallCount + largeCount + combinedCount;

  return { smallCount, largeCount, combinedCount, totalCount };
}

/**
 * Форматирует время в минуты:секунды
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Стратегия 1: Использование по кулдауну
 * Оба бурста используются сразу, затем по кулдауну до конца ключа
 */
export function calculateBurstsStrategy1(config: BurstConfig): StrategyResult {
  const keyDurationSeconds = config.keyDuration * 60;
  const bursts = createEmptyBurstData();

  // Оба бурста используются сразу (комбинированный)
  bursts.combined.push({ time: 0, type: BurstType.COMBINED });

  // Затем по кулдауну
  for (let time = config.smallCooldown; time < keyDurationSeconds; time += config.smallCooldown) {
    // Если время кратно и малому и большому CD - комбинированный бурст
    if (time % config.largeCooldown === 0) {
      bursts.combined.push({ time, type: BurstType.COMBINED });
    } 
    // Если время только малому CD - малый бурст
    else {
      bursts.small.push({ time, type: BurstType.SMALL });
    }
  }

  // Большие бурсты, которые не совпали с малыми
  for (let time = config.largeCooldown; time < keyDurationSeconds; time += config.largeCooldown) {
    if (time % config.smallCooldown !== 0) {
      bursts.large.push({ time, type: BurstType.LARGE });
    }
  }

  return {
    bursts,
    summary: calculateSummary(bursts)
  };
}

/**
 * Стратегия 2: Задержка бурстов с правильной логикой
 * Всегда чередуются малый бурст и малый+большой
 * Если есть задержка перед бурстом, то следующий сдается через время малого бурста + задержка
 */
export function calculateBurstsStrategy2(config: BurstConfig): StrategyResult {
  const keyDurationSeconds = config.keyDuration * 60;
  const bursts = createEmptyBurstData();

  let currentTime = 0;
  let isNextSmall = true; // Начинаем с малого бурста
  let lastLargeBurstTime = -config.largeCooldown; // Чтобы первый большой бурст точно можно было использовать

  // Первый малый бурст в начале
  bursts.small.push({ time: currentTime, type: BurstType.SMALL });
  currentTime += config.smallCooldown;
  isNextSmall = false; // Следующий должен быть малый+большой

  while (currentTime < keyDurationSeconds) {
    // Определяем, будет ли задержка (30% вероятность)
    const shouldDelay = Math.random() > 0.7;
    let delay = 0;

    if (shouldDelay) {
      delay = Math.floor(Math.random() * (config.maxDelay - config.minDelay + 1)) + config.minDelay;
    }

    const burstTime = Math.min(currentTime + delay, keyDurationSeconds - 1);

    if (isNextSmall) {
      // Малый бурст
      bursts.small.push({ time: burstTime, type: BurstType.SMALL });
      currentTime = burstTime + config.smallCooldown;
      isNextSmall = false; // Следующий будет малый+большой
    } else {
      // Проверяем, готов ли большой бурст к этому времени
      const largeReady = (burstTime - lastLargeBurstTime) >= config.largeCooldown;

      if (largeReady) {
        // Комбинированный бурст (малый + большой)
        bursts.combined.push({ time: burstTime, type: BurstType.COMBINED });
        lastLargeBurstTime = burstTime;
      } else {
        // Только малый бурст (большой еще не готов)
        bursts.small.push({ time: burstTime, type: BurstType.SMALL });
      }

      currentTime = burstTime + config.smallCooldown;
      isNextSmall = true; // Следующий будет малый
    }
  }

  return {
    bursts,
    summary: calculateSummary(bursts)
  };
}

