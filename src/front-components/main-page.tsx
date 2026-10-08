import { defineFrontComponent } from 'twenty-sdk/define';

import {
  APP_DISPLAY_NAME,
  MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

const MainPage = () => {
  const cardStyle = {
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '16px',
    background: '#FFFFFF',
  } as const;

  return (
    <main
      style={{
        boxSizing: 'border-box',
        width: '100%',
        minHeight: '100%',
        padding: '24px',
        background: '#F8FAFC',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#64748B',
            }}
          >
            M1 · Twenty Foundation
          </div>
          <h1
            style={{
              margin: '6px 0 8px',
              fontSize: '28px',
              lineHeight: 1.2,
              color: '#0F172A',
            }}
          >
            {APP_DISPLAY_NAME}
          </h1>
          <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>
            Основата е отделно Twenty приложение. Следващият вертикален поток е
            Днес → Аптека 360 → Посещение → Продукти → Заявка/Поръчка →
            Follow-up.
          </p>
        </div>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          <div style={cardStyle}>
            <strong style={{ color: '#0F172A' }}>Аптеки</strong>
            <p style={{ margin: '8px 0 0', color: '#64748B' }}>
              Първият custom object е включен като smoke test на data model-а.
            </p>
          </div>
          <div style={cardStyle}>
            <strong style={{ color: '#0F172A' }}>Сигурност</strong>
            <p style={{ margin: '8px 0 0', color: '#64748B' }}>
              AI няма директен unrestricted write access. Secrets остават
              server-side.
            </p>
          </div>
          <div style={cardStyle}>
            <strong style={{ color: '#0F172A' }}>Следващо</strong>
            <p style={{ margin: '8px 0 0', color: '#64748B' }}>
              M2: Company, Territory, Product, ProductAccount и Visit relations.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default defineFrontComponent({
  universalIdentifier: MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: APP_DISPLAY_NAME,
  description: 'Holista Sales foundation page',
  component: MainPage,
});
