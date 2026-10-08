import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
  PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { describe, expect, it } from 'vitest';

describe('Holista application identifiers', () => {
  it('exposes stable application metadata', () => {
    expect(APP_DISPLAY_NAME).toBe('Holista Sales');
    expect(APP_DESCRIPTION).toContain('pharmacy field-sales');
    expect(APPLICATION_UNIVERSAL_IDENTIFIER).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('keeps the Pharmacy object on a stable UUID', () => {
    expect(PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER).toBe(
      'e26922ea-26cf-4b00-bc36-e79658c2c3bb',
    );
  });
});
