/**
 * PriceService — orchestrates fuel price fetching, caching, and trend calculation.
 *
 * Delegates data fetching to the injected FuelDataAdapter. Computes trend
 * by comparing the latest price to the 7-day rolling average.
 *
 * @see docs/specs/price-dashboard/spec.md [FR-1] [FR-2]
 * @see docs/specs/price-dashboard/design.md [DES-ARCH] [DES-CACHE]
 */

import { FuelPrice, FuelType, PriceTrend, TrendDirection } from "../models/fuel-price.model";
import { FuelDataAdapter } from "../adapters/fuel-data.adapter";

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CacheEntry {
  prices: FuelPrice[];
  fetchedAt: number;
}

export class PriceService {
  private adapter: FuelDataAdapter;
  private cache: Map<string, CacheEntry> = new Map();

  constructor(adapter: FuelDataAdapter) {
    this.adapter = adapter;
  }

  /**
   * Get current prices for a region, using cache if fresh.
   */
  async getPrices(region: string): Promise<FuelPrice[]> {
    const cacheKey = `${this.adapter.getSourceName()}:${region}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return cached.prices;
    }

    const prices = await this.adapter.fetchPrices(region);
    this.cache.set(cacheKey, { prices, fetchedAt: Date.now() });
    return prices;
  }

  /**
   * Get prices filtered by fuel type.
   */
  async getPricesByFuelType(region: string, fuelType: FuelType): Promise<FuelPrice[]> {
    const prices = await this.getPrices(region);
    return prices.filter((p) => p.fuelType === fuelType);
  }

  /**
   * Calculate trend for a fuel type in a region.
   *
   * Compares the latest price to the 7-day rolling average.
   */
  async getTrend(region: string, fuelType: FuelType): Promise<PriceTrend> {
    const prices = await this.getPricesByFuelType(region, fuelType);

    if (prices.length === 0) {
      return {
        fuelType,
        currentPrice: 0,
        averagePrice: 0,
        delta: 0,
        direction: "stable",
      };
    }

    // Sort by timestamp descending
    const sorted = [...prices].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const currentPrice = sorted[0].price;

    // 7-day window
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentPrices = sorted.filter(
      (p) => new Date(p.timestamp).getTime() >= sevenDaysAgo
    );

    const averagePrice =
      recentPrices.length > 0
        ? recentPrices.reduce((sum, p) => sum + p.price, 0) / recentPrices.length
        : currentPrice;

    const delta = Number((currentPrice - averagePrice).toFixed(3));
    const threshold = 0.005; // Half a cent threshold for "stable"

    let direction: TrendDirection = "stable";
    if (delta > threshold) direction = "up";
    if (delta < -threshold) direction = "down";

    return { fuelType, currentPrice, averagePrice, delta, direction };
  }

  /**
   * Get the source name for display.
   */
  getSourceName(): string {
    return this.adapter.getSourceName();
  }

  /**
   * Get supported regions from the adapter.
   */
  getSupportedRegions(): string[] {
    return this.adapter.getSupportedRegions();
  }

  /**
   * Clear the price cache.
   */
  clearCache(): void {
    this.cache.clear();
  }
}
