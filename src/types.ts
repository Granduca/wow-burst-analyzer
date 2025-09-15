export interface BurstConfig {
  keyDuration: number; // в минутах
  smallCooldown: number; // в секундах
  largeCooldown: number; // в секундах
  minDelay: number; // в секундах
  maxDelay: number; // в секундах
}

export interface Burst {
  time: number; // время в секундах
  type: BurstType;
}

export enum BurstType {
  SMALL = 'small',
  LARGE = 'large',
  COMBINED = 'combined'
}

export interface BurstData {
  small: Burst[];
  large: Burst[];
  combined: Burst[];
}

export interface BurstSummary {
  smallCount: number;
  largeCount: number;
  combinedCount: number;
  totalCount: number;
}

export interface StrategyResult {
  bursts: BurstData;
  summary: BurstSummary;
}

