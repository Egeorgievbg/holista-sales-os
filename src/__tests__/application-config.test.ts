import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
  PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { describe, expect, it } from 'vitest';

describe('Holista Sales application identifiers', () => {
  it('defines stable application metadata', () => {
    expect(APP_DISPLAY_NAME).toBe('Holista Sales');
    expect(APP_DESCRIPTION.length).toBeGreaterThan(10);
    expect(APPLICATION_UNIVERSAL_IDENTIFIER).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('defines a stable Pharmacy object identifier', () => {
    expect(PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });
});
