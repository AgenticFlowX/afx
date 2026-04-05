/**
 * API adapter — fetches fuel prices from a REST endpoint.
 *
 * Supports NSW FuelCheck, EIA, TankerKoenig, and FuelWatch WA.
 * Configure via apiUrl and apiKey constructor parameters.
 *
 * @see docs/specs/price-dashboard/spec.md [FR-1]
 * @see docs/specs/price-dashboard/design.md [DES-ARCH]
 */

import { FuelPrice } from "../models/fuel-price.model";
import { FuelDataAdapter } from "./fuel-data.adapter";

export interface ApiAdapterConfig {
  apiUrl: string;
  apiKey?: string;
  regions: string[];
  sourceName: string;
}

export class ApiAdapter implements FuelDataAdapter {
  private config: ApiAdapterConfig;

  constructor(config: ApiAdapterConfig) {
    this.config = config;
  }

  async fetchPrices(region: string): Promise<FuelPrice[]> {
    const url = `${this.config.apiUrl}/prices?region=${encodeURIComponent(region)}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.config.apiKey) {
      headers["Authorization"] = `Bearer ${this.config.apiKey}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Normalize API response to FuelPrice[]
    // Actual mapping depends on the specific API — this is a stub
    return data.prices as FuelPrice[];
  }

  getSupportedRegions(): string[] {
    return this.config.regions;
  }

  getSourceName(): string {
    return this.config.sourceName;
  }
}
