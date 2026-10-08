import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  PHARMACY_CITY_FIELD_UNIVERSAL_IDENTIFIER,
  PHARMACY_DISTRICT_FIELD_UNIVERSAL_IDENTIFIER,
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
    'Физически аптечен обект. M1 smoke object; canonical relations and commercial fields are added in M2.',
  icon: 'IconBuildingStore',
  labelIdentifierFieldMetadataUniversalIdentifier:
    PHARMACY_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: PHARMACY_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Име',
      description: 'Име на аптечния обект',
      icon: 'IconBuildingStore',
    },
    {
      universalIdentifier: PHARMACY_CITY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'city',
      label: 'Град',
      description: 'Населено място',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier: PHARMACY_DISTRICT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'district',
      label: 'Район',
      description: 'Квартал или търговски район',
      icon: 'IconMap',
    },
  ],
});
