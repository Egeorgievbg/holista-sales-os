import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  PHARMACY_CITY_FIELD_UNIVERSAL_IDENTIFIER,
  PHARMACY_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
  PHARMACY_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: PHARMACY_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'pharmacy',
  namePlural: 'pharmacies',
  labelSingular: 'Аптека',
  labelPlural: 'Аптеки',
  description:
    'Physical pharmacy outlet. M1 smoke object; the complete field-sales schema is introduced in M2.',
  icon: 'IconBuildingStore',
  labelIdentifierFieldMetadataUniversalIdentifier:
    PHARMACY_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: PHARMACY_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Име',
      description: 'Display name of the physical pharmacy outlet',
      icon: 'IconBuildingStore',
    },
    {
      universalIdentifier: PHARMACY_CITY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'city',
      label: 'Град',
      description: 'City of the pharmacy outlet',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier: PHARMACY_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'externalId',
      label: 'Външен ID',
      description:
        'Stable identifier from an approved external source; never generated from display text',
      icon: 'IconKey',
    },
  ],
});
