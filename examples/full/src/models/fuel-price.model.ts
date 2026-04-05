/**
 * FuelPrice — canonical data shape for fuel price entries.
 *
 * All adapters (API, CSV) normalize their output to this interface
 * before passing data to the service layer.
 *
 * @see docs/specs/price-dashboard/spec.md [FR-1]
 * @see docs/specs/price-dashboard/design.md [DES-DATA]
 */

export type FuelType = "91" | "95" | "Diesel";

export interface FuelPrice {
  /** Fuel type: 91 octane, 95 octane, or Diesel */
  fuelType: FuelType;

  /** Price per litre in local currency */
  price: number;

  /** ISO 4217 currency code (e.g., "NZD", "AUD", "USD") */
  currency: string;

  /** Station name, if available */
  station?: string;

  /** Geographic region (e.g., "Auckland", "Sydney", "California") */
  region: string;

  /** ISO 8601 timestamp of the price observation */
  timestamp: string;
}

export type TrendDirection = "up" | "down" | "stable";

export interface PriceTrend {
  fuelType: FuelType;
  currentPrice: number;
  averagePrice: number;
  delta: number;
  direction: TrendDirection;
}
