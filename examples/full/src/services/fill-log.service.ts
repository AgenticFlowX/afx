/**
 * FillLogService — CRUD operations for fuel fill-up entries.
 *
 * Persists data to localStorage under the key "fuelsnap:fill-log".
 * Total cost is always computed (never stored independently).
 *
 * @see docs/specs/fill-log/spec.md [FR-1] [FR-2] [FR-3] [FR-4]
 * @see docs/specs/fill-log/design.md [DES-SERVICE] [DES-STORAGE]
 */

import { FillUp, FillUpInput } from "../models/fill-up.model";

const STORAGE_KEY = "fuelsnap:fill-log";
const DEFAULT_PAGE_SIZE = 20;

export class FillLogService {
  /**
   * Add a new fill-up entry.
   */
  addFillUp(input: FillUpInput): FillUp {
    this.validateInput(input);

    const fillUp: FillUp = {
      id: crypto.randomUUID(),
      date: input.date,
      station: input.station,
      litres: input.litres,
      pricePerLitre: input.pricePerLitre,
      totalCost: Number((input.litres * input.pricePerLitre).toFixed(2)),
    };

    const entries = this.loadAll();
    entries.push(fillUp);
    this.saveAll(entries);

    return fillUp;
  }

  /**
   * Update an existing fill-up entry.
   */
  updateFillUp(id: string, updates: Partial<FillUpInput>): FillUp {
    const entries = this.loadAll();
    const index = entries.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error(`Fill-up entry not found: ${id}`);
    }

    const existing = entries[index];
    const updated: FillUp = {
      ...existing,
      ...updates,
      id: existing.id, // ID is immutable
      totalCost: 0, // Will be recomputed below
    };

    updated.totalCost = Number((updated.litres * updated.pricePerLitre).toFixed(2));

    entries[index] = updated;
    this.saveAll(entries);

    return updated;
  }

  /**
   * Delete a fill-up entry by ID.
   */
  deleteFillUp(id: string): void {
    const entries = this.loadAll();
    const filtered = entries.filter((e) => e.id !== id);

    if (filtered.length === entries.length) {
      throw new Error(`Fill-up entry not found: ${id}`);
    }

    this.saveAll(filtered);
  }

  /**
   * List fill-up entries in reverse chronological order with pagination.
   */
  listFillUps(page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE): FillUp[] {
    const entries = this.loadAll();

    // Sort descending by date
    entries.sort((a, b) => b.date.localeCompare(a.date));

    const start = (page - 1) * pageSize;
    return entries.slice(start, start + pageSize);
  }

  /**
   * Get all fill-up entries (unsorted).
   */
  getAll(): FillUp[] {
    return this.loadAll();
  }

  /**
   * Get total entry count.
   */
  getCount(): number {
    return this.loadAll().length;
  }

  // --- Private helpers ---

  private loadAll(): FillUp[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as FillUp[];
    } catch {
      return [];
    }
  }

  private saveAll(entries: FillUp[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  private validateInput(input: FillUpInput): void {
    if (!input.station || input.station.trim().length === 0) {
      throw new Error("Station name is required");
    }
    if (input.station.length > 100) {
      throw new Error("Station name must be 100 characters or less");
    }
    if (input.litres <= 0 || input.litres > 200) {
      throw new Error("Litres must be between 0 and 200");
    }
    if (input.pricePerLitre <= 0 || input.pricePerLitre > 10) {
      throw new Error("Price per litre must be between 0 and 10");
    }
    if (!input.date || isNaN(Date.parse(input.date))) {
      throw new Error("Valid date is required");
    }
    if (new Date(input.date) > new Date()) {
      throw new Error("Date cannot be in the future");
    }
  }
}
