/**
 * Base adapter interface for fuel price data sources.
 *
 * All concrete adapters (API, CSV) implement this interface so the
 * dashboard can swap data sources without changing UI code.
 *
 * @see docs/specs/price-dashboard/design.md [DES-ARCH]
 */

import { FuelPrice } from "../models/fuel-price.model";

export interface FuelDataAdapter {
  /**
   * Fetch current fuel prices for a given region.
   */
  fetchPrices(region: string): Promise<FuelPrice[]>;

  /**
   * Return the list of regions this adapter supports.
   */
  getSupportedRegions(): string[];

  /**
   * Return a human-readable name for this data source.
   */
  getSourceName(): string;
}
