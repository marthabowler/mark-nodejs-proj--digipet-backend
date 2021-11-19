import {
  Digipet,
  getDigipet,
  INITIAL_DIGIPET,
  setDigipet,
  updateDigipetBounded,
} from "./model";

/**
 * The actions that your Digipet game supports.
 *
 * These update the underlying digipet by using the functions defined in model.ts
 */

export function hatchDigipet(): Digipet {
  if (getDigipet()) {
    throw new Error("Can't hatch a digipet when you already have one!");
  } else {
    // spread to avoid accidental mutation
    const newDigipet = { ...INITIAL_DIGIPET };
    setDigipet(newDigipet);
    return newDigipet;
  }
}

export function rehomeDigipet(): void {
  if (getDigipet()) {
    setDigipet(undefined);
  } else {
    throw new Error("You don't have a digipet! Hatch a new one!");
  }
}

export function ignoreDigipet(): void {
  updateDigipetBounded("nutrition", -10);
  updateDigipetBounded("discipline", -10);
  updateDigipetBounded("happiness", -10);
}
export function feedDigipet(): void {
  updateDigipetBounded("nutrition", 10);
  updateDigipetBounded("discipline", -5);
}

export function trainDigipet(): void {
  updateDigipetBounded("discipline", 10);
  updateDigipetBounded("happiness", -5);
}

export function walkDigipet(): void {
  updateDigipetBounded("happiness", 10);
  updateDigipetBounded("nutrition", -5);
}
