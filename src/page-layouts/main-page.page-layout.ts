import {
  definePageLayout,
  PageLayoutTabLayoutMode,
  PageLayoutWidgetVerticalListHeightBehavior,
} from 'twenty-sdk/define';

import {
  MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  MAIN_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
  MAIN_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  MAIN_PAGE_WIDGET_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default definePageLayout({
  universalIdentifier: MAIN_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Holista Sales',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier: MAIN_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
      title: 'Начало',
      position: 0,
      icon: 'IconApps',
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: MAIN_PAGE_WIDGET_UNIVERSAL_IDENTIFIER,
          title: ' ',
          type: 'FRONT_COMPONENT',
          position: {
            layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
            index: 0,
            heightBehavior:
              PageLayoutWidgetVerticalListHeightBehavior.TAB_VIEWPORT,
          },
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              MAIN_PAGE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});
