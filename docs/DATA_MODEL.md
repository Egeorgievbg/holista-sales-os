# DATA_MODEL.md — Holista Sales OS Canonical Model

Status: DESIGN CONTRACT
Implementation must be validated against the selected Twenty App SDK/version before schema sync.

## 1. Company

Purpose: legal entity, pharmacy chain, distributor or customer organization.

Core fields:
- name: text, required
- legalName: text
- customerCode: text
- externalId: text
- status: enum(active, inactive, prospect)
- ownerUser: relation/user
- notes: long text where native notes are insufficient

Relations:
- Company 1:N Pharmacy
- Company 1:N Person where appropriate

## 2. Pharmacy

Purpose: physical commercial outlet.

Core fields:
- name: text, required
- company: N:1 Company
- addressLine: text
- city: text
- district: text
- postalCode: text
- latitude: number
- longitude: number
- phone: text
- email: text
- workingHours: text/structured later
- status: enum(prospect, active, inactive, blocked)
- priority: enum(low, medium, high, critical)
- potentialScore: number 0..100
- customerCode: text
- erpId: text
- territory: N:1 Territory
- assignedRep: user/relation
- lastVisitAt: datetime
- nextVisitDue: datetime/date
- visitFrequencyDays: integer
- source: text/enum
- sourceUpdatedAt: datetime

Relations:
- Pharmacy 1:N Visit
- Pharmacy 1:N ProductAccount
- Pharmacy 1:N Request
- Pharmacy 1:N Order
- Pharmacy 1:N InventoryObservation
- Pharmacy N:M Person through contact/account relation if needed

## 3. Person / Contact

Prefer native Twenty person/contact when it satisfies requirements.

Fields/extensions:
- role: enum(pharmacist, manager, buyer, owner, assistant, other)
- decisionRole: enum(decision_maker, influencer, user, unknown)
- pharmacy/company relations
- preferredContactMethod
- businessPhone
- businessEmail
- notes via native activity/note layer

Do not store unnecessary sensitive personal data.

## 4. Territory

Fields:
- name
- code
- ownerRep
- manager
- active
- geographyDefinition: structured later
- notes

Relations:
- Territory 1:N Pharmacy
- Territory 1:N RoutePlan

## 5. Brand

Fields:
- name
- externalId
- active
- officialSourceUrl where appropriate
- sourceUpdatedAt

Relations:
- Brand 1:N Product

## 6. Product

Fields:
- name
- sku
- externalId
- brand
- slug
- active
- productType/category
- officialDescription
- imageUrl
- sourceUrl
- sourceSystem
- sourceUpdatedAt
- currentListPrice if used for catalogue display
- currency
- stockState if supplied by official source
- rawSourceHash/version optional

Rules:
- SKU/externalId uniqueness must be validated.
- official data and internally enriched sales data must not be conflated.

## 7. ProductAccount

Purpose: commercial relationship between one Product and one Pharmacy.

Fields:
- pharmacy: N:1 Pharmacy, required
- product: N:1 Product, required
- listed: boolean/unknown
- stockState: enum(unknown, none, low, normal, high)
- interest: enum(unknown, none, low, medium, high)
- recommendationLevel: enum(unknown, low, medium, high)
- shelfVisibility: enum(unknown, poor, normal, strong)
- lastDiscussedAt: datetime
- lastOrderedAt: datetime
- lastOrderQty: number
- objection: long text / structured later
- competitorPresent: boolean/unknown
- competitorNotes: text
- opportunityScore: number 0..100
- evidenceSource: text/relation
- observedAt: datetime
- updatedBy

Constraint:
- unique logical pair `pharmacy + product` unless version/history model requires otherwise.

## 8. Visit

Fields:
- pharmacy
- assignedRep
- plannedStart
- actualStart
- actualEnd
- status: enum(planned, preparing, in_progress, review, completed, cancelled)
- objective
- outcome: enum(unknown, successful, partial, no_contact, cancelled, follow_up_required)
- primaryContact
- summary
- followUpRequired
- followUpDate
- nextAction
- routeStop optional
- createdBy
- completedBy

Rules:
- completed status requires review validation.
- timestamps must reflect actual execution, not be invented from plan.

## 9. VisitProduct

Fields:
- visit
- product
- productAccount optional
- interest
- reaction
- objection
- outcome
- quantityRequested optional
- notes
- evidence/provenance where imported

## 10. Request

Fields:
- pharmacy
- visit optional
- contact optional
- status: enum(draft, open, follow_up, approved, rejected, converted, closed)
- requestedAt
- dueAt
- notes
- ownerRep
- convertedOrder optional

Relations:
- Request 1:N RequestLine

## 11. RequestLine

Fields:
- request
- product
- skuSnapshot
- quantity
- requestedPrice optional
- notes

## 12. Order

Fields:
- pharmacy
- company
- visit optional
- sourceRequest optional
- orderNumber/internalRef
- externalErpId optional
- status: enum(draft, pending_confirmation, confirmed, exported, fulfilled, cancelled)
- orderedAt
- deliveryDate optional
- currency
- subtotalSnapshot
- discountTotalSnapshot
- totalSnapshot
- ownerRep
- confirmedBy
- confirmedAt

Relations:
- Order 1:N OrderLine

## 13. OrderLine

Fields:
- order
- product
- productNameSnapshot
- skuSnapshot
- quantity
- listPriceSnapshot
- discountSnapshot
- netUnitPriceSnapshot
- lineTotalSnapshot
- currencySnapshot
- taxSnapshot optional

Rule:
Historical values are immutable after commercial confirmation except explicit audited correction.

## 14. InventoryObservation

Fields:
- pharmacy
- product
- visit optional
- observedAt
- quantityApprox optional
- stockState
- shelfVisibility
- expiryDate optional
- expiryRisk enum(unknown, none, low, medium, high)
- note
- observedBy

Do not claim exact inventory quantity unless actually captured from a reliable source.

## 15. RoutePlan

Fields:
- date
- territory
- assignedRep
- status: enum(draft, active, completed, cancelled)
- startLocation optional
- optimizationVersion optional
- notes

Relations:
- RoutePlan 1:N RouteStop

## 16. RouteStop

Fields:
- routePlan
- pharmacy
- sequence
- plannedArrival
- actualArrival
- status: enum(planned, arrived, completed, skipped)
- visit optional
- reason/notes

## 17. PriceList / PriceListItem

PriceList:
- name
- code
- currency
- validFrom
- validTo
- active
- customer/segment scope later

PriceListItem:
- priceList
- product
- listPrice
- optional discount/rule metadata

Use price list only for new commercial calculation. Never retroactively alter OrderLine snapshots.

## 18. Opportunity

Use only if it adds business value beyond ProductAccount/Request.

Possible fields:
- pharmacy/company
- title
- stage
- value estimate
- probability
- nextAction
- owner
- related products

Do not force generic deal pipeline semantics into every pharmacy relationship.

## 19. Native Twenty primitives

Before creating custom substitutes, evaluate native:
- Task
- Note
- Activity/Timeline
- Person
- Company
- Calendar/event where available

Custom objects should exist only when Holista-specific semantics justify them.

## 20. Audit/provenance convention

Where material:
- sourceSystem
- sourceId
- sourceUrl
- sourceUpdatedAt
- importedAt
- createdBy
- updatedBy

Never present inferred or AI-generated values as source facts.

## 21. Naming convention

Code/object names: English.
Primary user-visible labels: Bulgarian.

Example:
- object: `Pharmacy`
- UI label: `Аптека`
- object: `Visit`
- UI label: `Посещение`
- object: `ProductAccount`
- UI label: `Продукт в аптека`

This avoids Bulgarian identifiers in code while keeping the product Bulgarian-first.
