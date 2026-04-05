/**
 * SpendService — aggregates fill-up data into monthly summaries and comparisons.
 *
 * Composes FillLogService (user data) and PriceService (regional averages)
 * to produce spend analytics. All methods are pure computations with no
 * persistence of their own.
 *
 * @see docs/specs/spend-tracker/spec.md [FR-1] [FR-2] [FR-3]
 * @see docs/specs/spend-tracker/design.md [DES-ARCH] [DES-SERVICE]
 */

import { FillUp } from "../models/fill-up.model";
import { FillLogService } from "./fill-log.service";
import { PriceService } from "./price.service";

export interface MonthlySummary {
  month: string; // YYYY-MM
  totalLitres: number;
  totalCost: number;
  avgPricePerLitre: number;
  fillUpCount: number;
}

export interface CostPerKm {
  month: string;
  totalCost: number;
  kmDriven: number;
  costPerKm: number;
}

export interface ComparisonPoint {
  month: string;
  userAvgPrice: number;
  regionalAvgPrice: number;
}

export class SpendService {
  private fillLogService: FillLogService;
  private priceService: PriceService;

  constructor(fillLogService: FillLogService, priceService: PriceService) {
    this.fillLogService = fillLogService;
    this.priceService = priceService;
  }

  /**
   * Get a monthly spend summary for the given month (YYYY-MM).
   */
  getMonthlySummary(month: string): MonthlySummary {
    const entries = this.getEntriesForMonth(month);

    if (entries.length === 0) {
      return {
        month,
        totalLitres: 0,
        totalCost: 0,
        avgPricePerLitre: 0,
        fillUpCount: 0,
      };
    }

    const totalLitres = entries.reduce((sum, e) => sum + e.litres, 0);
    const totalCost = entries.reduce((sum, e) => sum + e.totalCost, 0);

    return {
      month,
      totalLitres: Number(totalLitres.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      avgPricePerLitre: Number((totalCost / totalLitres).toFixed(3)),
      fillUpCount: entries.length,
    };
  }

  /**
   * Calculate cost per kilometre for a given month.
   */
  getCostPerKm(month: string, kmDriven: number): CostPerKm {
    if (kmDriven <= 0) {
      throw new Error("Kilometres driven must be greater than 0");
    }

    const summary = this.getMonthlySummary(month);

    return {
      month,
      totalCost: summary.totalCost,
      kmDriven,
      costPerKm: Number((summary.totalCost / kmDriven).toFixed(4)),
    };
  }

  /**
   * Get comparison data: user's average price vs regional average per month.
   */
  async getComparisonData(
    months: string[],
    region: string
  ): Promise<ComparisonPoint[]> {
    const results: ComparisonPoint[] = [];

    for (const month of months) {
      const summary = this.getMonthlySummary(month);
      const regionalPrices = await this.priceService.getPrices(region);

      // Compute regional average from all fuel types
      const regionalAvg =
        regionalPrices.length > 0
          ? regionalPrices.reduce((sum, p) => sum + p.price, 0) / regionalPrices.length
          : 0;

      results.push({
        month,
        userAvgPrice: summary.avgPricePerLitre,
        regionalAvgPrice: Number(regionalAvg.toFixed(3)),
      });
    }

    return results;
  }

  // --- Private helpers ---

  private getEntriesForMonth(month: string): FillUp[] {
    const all = this.fillLogService.getAll();
    return all.filter((e) => e.date.startsWith(month));
  }
}
