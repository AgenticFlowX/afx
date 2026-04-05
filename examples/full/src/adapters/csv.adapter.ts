/**
 * CSV adapter — reads fuel prices from a local CSV file.
 *
 * Designed for data sources like MBIE NZ which publish fuel
 * prices as downloadable CSV files rather than REST APIs.
 *
 * @see docs/specs/price-dashboard/spec.md [FR-1]
 * @see docs/specs/price-dashboard/design.md [DES-ARCH]
 */

import { FuelPrice } from "../models/fuel-price.model";
import { FuelDataAdapter } from "./fuel-data.adapter";

export interface CsvAdapterConfig {
  filePath: string;
  regions: string[];
  sourceName: string;
  delimiter?: string;
}

export class CsvAdapter implements FuelDataAdapter {
  private config: CsvAdapterConfig;

  constructor(config: CsvAdapterConfig) {
    this.config = config;
  }

  async fetchPrices(region: string): Promise<FuelPrice[]> {
    // In a real implementation, this would read and parse the CSV file.
    // For Node.js: fs.readFileSync(this.config.filePath, "utf-8")
    // For browser: fetch the file or accept FileReader input.
    const delimiter = this.config.delimiter ?? ",";
    const prices: FuelPrice[] = [];

    // Stub: parse CSV rows into FuelPrice objects
    // Expected columns: date, fuel_type, price, region, station
    // Each row maps to:
    // {
    //   fuelType: row.fuel_type,
    //   price: parseFloat(row.price),
    //   currency: "NZD",
    //   station: row.station,
    //   region: row.region,
    //   timestamp: row.date,
    // }

    return prices.filter((p) => p.region === region);
  }

  getSupportedRegions(): string[] {
    return this.config.regions;
  }

  getSourceName(): string {
    return this.config.sourceName;
  }
}
