import { MetadataApiClient } from 'twenty-client-sdk/metadata';
import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { describe, expect, it } from 'vitest';

describe('Holista Sales installation', () => {
  it('registers the application in Twenty', async () => {
    const client = new MetadataApiClient();

    const result = await client.query({
      findManyApplications: {
        id: true,
        name: true,
        universalIdentifier: true,
      },
    });

    const app = result.findManyApplications.find(
      (candidate: { universalIdentifier: string }) =>
        candidate.universalIdentifier === APPLICATION_UNIVERSAL_IDENTIFIER,
    );

    expect(app).toBeDefined();
  });

  it('ships a stable Pharmacy object identifier', () => {
    expect(PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER).toBe(
      'e26922ea-26cf-4b00-bc36-e79658c2c3bb',
    );
  });
});
