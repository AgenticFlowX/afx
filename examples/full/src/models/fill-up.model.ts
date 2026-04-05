/**
 * FillUp — data model for a single fuel fill-up entry.
 *
 * Stored in localStorage as a JSON array. Total cost is always
 * computed as litres * pricePerLitre.
 *
 * @see docs/specs/fill-log/spec.md [FR-1]
 * @see docs/specs/fill-log/design.md [DES-DATA]
 */

export interface FillUp {
  /** Unique identifier (UUID v4) */
  id: string;

  /** Date of fill-up (YYYY-MM-DD) */
  date: string;

  /** Station name (free text) */
  station: string;

  /** Litres filled */
  litres: number;

  /** Price per litre in local currency */
  pricePerLitre: number;

  /** Computed: litres * pricePerLitre */
  totalCost: number;
}

/**
 * Input shape for creating a new fill-up (id and totalCost are generated).
 */
export type FillUpInput = Omit<FillUp, "id" | "totalCost">;
