//
// Software Name: Orange Design System Charts
// SPDX-FileCopyrightText: Copyright (c) 2023 Orange SA
// SPDX-License-Identifier: MIT
//
// This software is distributed under the MIT license.
//

export enum ODSChartsCSSThemesNames {
  NONE = 'NONE',
  BOOSTED4 = 'BOOSTED4',
  BOOSTED5 = 'BOOSTED5',
  CUSTOM = 'CUSTOM',
}

/**
 * ODSChartsItemCSSDefinition defines the classes or styles to be added on generated HTML element
 */
export class ODSChartsItemCSSDefinition {
  /**
   * list of classes to be added on the HTML element
   *
   * example:
   * ```
   * classes: ['d-block', 'position-relative']
   * ```
   */
  classes?: string[];
  /**
   * map of cssProperty to be added in style attribute of the HTML element;
   *
   * example:
   * ```
   *   styles: {
   *     width: '10px',
   *     height: '10px',
   *   }
   * ```
   */
  styles?: { [cssProperty: string]: string };

  static getClasses(def?: ODSChartsItemCSSDefinition): string {
    return def && def.classes ? def.classes.join(' ') : '';
  }

  static getStyles(def?: ODSChartsItemCSSDefinition): string {
    return def && def.styles
      ? Object.keys(def.styles)
          .map((property) => `${property}: ${(def.styles as any)[property]}`)
          .join('; ')
      : '';
  }
}

/**
 * ODSChartsItemGroupCSSDefinition defines the classes an styles to be add on code generated by the library.
 */
export class ODSChartsItemGroupCSSDefinition {
  /**
   * for any class of generated element, we can provide class or style to be added
   */
  [mappedClass: string]: ODSChartsItemCSSDefinition | undefined;
}

export class ODSChartsCSSLegendsDefinition extends ODSChartsItemGroupCSSDefinition {
  odsChartsLegendHolder?: ODSChartsItemCSSDefinition;
  odsChartsLegendContainer?: ODSChartsItemCSSDefinition;
  odsChartsLegendLink?: ODSChartsItemCSSDefinition;
  odsChartsLegendLinkOpacity?: ODSChartsItemCSSDefinition;
  odsChartsLegendColorHolder?: ODSChartsItemCSSDefinition;
  odsChartsLegendColor?: ODSChartsItemCSSDefinition;
  odsChartsLegendLabel?: ODSChartsItemCSSDefinition;
}

export class ODSChartsCSSPopoverDefinition extends ODSChartsItemGroupCSSDefinition {
  odsChartsPopover?: ODSChartsItemCSSDefinition;
  odsChartsPopoverHolder?: ODSChartsItemCSSDefinition;
  odsChartsPopoverInner?: ODSChartsItemCSSDefinition;
  odsChartsPopoverContent?: ODSChartsItemCSSDefinition;
  odsChartsPopoverArrow?: ODSChartsItemCSSDefinition;
  odsChartsPopoverHeader?: ODSChartsItemCSSDefinition;
  odsChartsPopoverBody?: ODSChartsItemCSSDefinition;
  odsChartsPopoverBodyContent?: ODSChartsItemCSSDefinition;
  odsChartsPopoverLine?: ODSChartsItemCSSDefinition;
  odsChartsPopoverColorHolder?: ODSChartsItemCSSDefinition;
  odsChartsPopoverColor?: ODSChartsItemCSSDefinition;
  odsChartsPopoverText?: ODSChartsItemCSSDefinition;
  odsChartsPopoverLabel?: ODSChartsItemCSSDefinition;
  odsChartsPopoverValue?: ODSChartsItemCSSDefinition;
}

/**
 * ODSChartsCSSThemeDefinition defines the classes an styles to be add on code generated by the library.
 */
export class ODSChartsCSSThemeDefinition {
  /**
   * classes an styles to be add to legends generated code.
   */
  legends: ODSChartsCSSLegendsDefinition = undefined as any;
  /**
   * classes an styles to be add to popover and tooltip generated code.
   */
  popover: ODSChartsCSSPopoverDefinition = undefined as any;
}

const BOOSTED5_Definition: ODSChartsCSSThemeDefinition = {
  legends: {
    odsChartsLegendHolder: {
      classes: ['ps-3', 'pt-2'],
    },
    odsChartsLegendContainer: {
      classes: ['d-flex', 'flex-wrap', 'justify-content-start'],
    },
    odsChartsLegendLink: { classes: ['mx-3', 'pb-2', 'text-decoration-none'] },
    odsChartsLegendLinkOpacity: { classes: ['opacity-25'] },
    odsChartsLegendColorHolder: {
      classes: ['d-inline-block', 'border', 'border-1'],
    },
    odsChartsLegendColor: {
      classes: ['d-block', 'position-relative'],
      styles: {
        width: '10px',
        height: '10px',
      },
    },
    odsChartsLegendLabel: {},
  },
  popover: {
    odsChartsPopoverLine: { classes: ['text-nowrap'] },
    odsChartsPopoverColorHolder: {
      classes: ['d-inline-block', 'border', 'border-1'],
    },
    odsChartsPopoverColor: {
      classes: ['d-block', 'position-relative'],
      styles: {
        width: '10px',
        height: '10px',
      },
    },
  },
};

const BOOSTED4_Definition: ODSChartsCSSThemeDefinition = {
  legends: {
    odsChartsLegendHolder: {
      classes: ['pl-3', 'pt-2'],
    },
    odsChartsLegendContainer: {
      classes: ['d-flex', 'flex-wrap', 'justify-content-start'],
    },
    odsChartsLegendLink: {
      classes: ['mx-3', 'pb-2', 'text-decoration-none'],
      styles: {
        opacity: '1',
      },
    },
    odsChartsLegendLinkOpacity: {
      classes: ['opacity-25'],
      styles: {
        opacity: '.25',
      },
    },
    odsChartsLegendColorHolder: {
      classes: ['d-inline-block', 'border'],
      styles: {
        'border-width': '0.10625rem!important',
      },
    },
    odsChartsLegendColor: {
      classes: ['d-block', 'position-relative'],
      styles: {
        width: '10px',
        height: '10px',
      },
    },
    odsChartsLegendLabel: {},
  },
  popover: {
    odsChartsPopoverColorHolder: {
      classes: ['d-inline-block', 'border'],
      styles: {
        'border-width': '0.10625rem!important',
      },
    },
    odsChartsPopoverColor: {
      classes: ['d-block', 'position-relative'],
      styles: {
        width: '10px',
        height: '10px',
      },
    },
  },
};

const NONE: ODSChartsCSSThemeDefinition = {
  legends: { odsChartsLegendHolder: { classes: ['ods-charts-no-css-lib'] } },
  popover: {
    odsChartsPopoverHolder: { classes: ['ods-charts-no-css-lib'] },
    odsChartsPopover: { classes: ['ods-charts-no-css-lib'] },
    odsChartsPopoverBodyContent: { classes: ['ods-charts-no-css-lib'] },
    odsChartsPopoverLine: { classes: ['ods-charts-no-css-lib'] },
  },
};

/**
 * Pre-configured {@link ODSChartsCSSThemeDefinition}
 * - ODSCharts.ODSChartsCSSThemes.NONE: the generated code will use an embedded independent style auto-generated by the library.
 * - ODSCharts.ODSChartsCSSThemes.BOOSTED5: the generated code will use Boosted 5 framework CSS.
 * - ODSCharts.ODSChartsCSSThemes.BOOSTED4: the generated code will use Boosted 4 framework CSS.
 */
export const ODSChartsCSSThemes: {
  [name in ODSChartsCSSThemesNames]: ODSChartsCSSThemeDefinition;
} = {
  BOOSTED4: BOOSTED4_Definition,
  BOOSTED5: BOOSTED5_Definition,
  NONE: NONE,
  CUSTOM: { legends: {}, popover: {} },
};
