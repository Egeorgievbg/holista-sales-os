import { defineFrontComponent } from 'twenty-sdk/define';

import {
  APP_DISPLAY_NAME,
  MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

const cards = [
  {
    title: 'Днес',
    body: 'Посещения, follow-up задачи и следващи действия.',
  },
  {
    title: 'Аптеки',
    body: 'Pharmacy 360, контакти и търговска история.',
  },
  {
    title: 'Посещения',
    body: 'Prepare → Visit → Review → Follow-up.',
  },
  {
    title: 'Продукти',
    body: 'Официален Holista каталог и Product × Pharmacy intelligence.',
  },
] as const;

const MainPage = () => (
  <div
    style={{
      boxSizing: 'border-box',
      minHeight: '100%',
      padding: '32px',
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f7f8fa',
      color: '#1f2937',
    }}
  >
    <div
      style={{
        maxWidth: '980px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <header
        style={{
          padding: '28px',
          borderRadius: '16px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6b7280',
          }}
        >
          M1 · Twenty App Foundation
        </div>
        <h1 style={{ margin: '8px 0 8px', fontSize: '30px' }}>
          {APP_DISPLAY_NAME}
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: '720px',
            lineHeight: 1.6,
            color: '#4b5563',
          }}
        >
          Mobile-first field-sales CRM за работа с аптеки. Този екран доказва
          Twenty App lifecycle-а; реалните Holista модули се добавят поетапно
          след build, sync и permission verification.
        </p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
        }}
      >
        {cards.map((card) => (
          <article
            key={card.title}
            style={{
              padding: '20px',
              borderRadius: '14px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
            }}
          >
            <h2 style={{ margin: '0 0 8px', fontSize: '17px' }}>
              {card.title}
            </h2>
            <p
              style={{
                margin: 0,
                lineHeight: 1.5,
                fontSize: '14px',
                color: '#6b7280',
              }}
            >
              {card.body}
            </p>
          </article>
        ))}
      </section>

      <div
        style={{
          padding: '16px 18px',
          borderRadius: '12px',
          border: '1px solid #dbe3ea',
          background: '#ffffff',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#4b5563',
        }}
      >
        Production data, Holista sync, Visit OS, Orders and AI are intentionally
        not enabled in M1. Demo data must never silently replace failed real
        data.
      </div>
    </div>
  </div>
);

export default defineFrontComponent({
  universalIdentifier: MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'holista-sales-main-page',
  description: 'Holista Sales M1 foundation page',
  component: MainPage,
});
