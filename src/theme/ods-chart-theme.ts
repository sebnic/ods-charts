//
// Software Name: Orange Design System Charts
// SPDX-FileCopyrightText: Copyright (c) 2023 Orange SA
// SPDX-License-Identifier: MIT
//
// This software is distributed under the MIT license.
//

import { LIGHT_CATEGORICAL_COLORS_SUPPORTING_COLORS } from './light/ODS.categorical-colors.supporting-colors';
import { LIGHT_COMMON } from './light/ODS.common';
import { LIGHT_LINES_AXIS } from './light/ODS.lines.axis';
import { LIGHT_CATEGORICAL_COLORS_DAKER_TINTS } from './light/ODS.categorical-colors.darker-tints';
import { LIGHT_CATEGORICAL_COLORS_LIGHTER_TINTS } from './light/ODS.categorical-colors.lighter-tints';
import { LIGHT_CATEGORICAL_COLORS_BLUE } from './light/ODS.categorical-colors.blue';
import { LIGHT_CATEGORICAL_COLORS_GREEN } from './light/ODS.categorical-colors.green';
import { LIGHT_CATEGORICAL_COLORS_PURPLE } from './light/ODS.categorical-colors.purple';
import { LIGHT_SEQUENTIAL_COLORS_BLUE } from './light/ODS.sequential-colors.blue';
import { LIGHT_SEQUENTIAL_COLORS_GREEN } from './light/ODS.sequential-colors.green';
import { LIGHT_SEQUENTIAL_COLORS_PURPLE } from './light/ODS.sequential-colors.purple';
import { COMMON_LINE_STYLE_BROKEN } from './common/ODS.line-style.broken';
import { COMMON_LINE_STYLE_POINTS } from './common/ODS.line-style.with-points';
import { COMMON_LINE_STYLE_SMOOTH } from './common/ODS.line-style.smooth';
import { DARK_COMMON } from './dark/ODS.common';
import { DARK_LINES_AXIS } from './dark/ODS.lines.axis';
import { DARK_CATEGORICAL_COLORS_SUPPORTING_COLORS } from './dark/ODS.categorical-colors.supporting-colors';
import { DARK_CATEGORICAL_COLORS_DAKER_TINTS } from './dark/ODS.categorical-colors.darker-tints';
import { DARK_CATEGORICAL_COLORS_LIGHTER_TINTS } from './dark/ODS.categorical-colors.lighter-tints';
import { DARK_CATEGORICAL_COLORS_BLUE } from './dark/ODS.categorical-colors.blue';
import { DARK_CATEGORICAL_COLORS_GREEN } from './dark/ODS.categorical-colors.green';
import { DARK_CATEGORICAL_COLORS_PURPLE } from './dark/ODS.categorical-colors.purple';
import { DARK_SEQUENTIAL_COLORS_BLUE } from './dark/ODS.sequential-colors.blue';
import { DARK_SEQUENTIAL_COLORS_GREEN } from './dark/ODS.sequential-colors.green';
import { DARK_SEQUENTIAL_COLORS_PURPLE } from './dark/ODS.sequential-colors.purple';
import { ODS_PROJECT } from './ODS.project';
import { ODSChartsLegends } from './legends/ods-chart-legends';
import { mergeObjects } from '../tools/merge-objects';
import { ODSChartsResize } from './resize/ods-chart-resize';
import {
  ODSChartsCSSThemeDefinition,
  ODSChartsCSSThemes,
  ODSChartsCSSThemesNames,
} from './css-themes/css-themes';
import { getStringValue } from '../tools/hash';
import { cloneDeepObject } from '../tools/clone-deep-object';
import { ODSChartsPopover } from './popover/ods-chart-popover';
import {
  ODSChartsPopoverConfig,
  ODSChartsPopoverDefinition,
  ODSChartsPopoverManagers,
} from './popover/ods-chart-popover-definitions';

export enum ODSCHartsCategoricalColorsSet {
  DEFAULT_SUPPORTING_COLORS = 'supportingColors',
  DARKER_TINTS = 'darkerTints',
  LIGHTER_TINTS = 'lighterTints',
  SEQUENTIAL_BLUE = 'blue',
  SEQUENTIAL_GREEN = 'green',
  SEQUENTIAL_PURPLE = 'purple',
}

/**
 * ODSCHartsCustomCategoricalColor is used to define a color.
 *
 * - It can be the string value of the color
 *
 * - Or it can be a {@link ODSCHartsCategoricalColor} to reference a color of one predefined set of Orange Design System colors.
 *
 * example
 * ```
 * {
 *  colorPalette: ODSCharts.ODSCHartsCategoricalColorsSet.DARKER_TINTS,
 *  colorIndex: 0,
 * }
 * ```
 */
export type ODSCHartsCustomCategoricalColor =
  | ODSCHartsCategoricalColor
  | string;

/**
 * ODSCHartsCategoricalColor is a color extract from one set of color of Orange Design System.
 */
export interface ODSCHartsCategoricalColor {
  /**
   * The {@link ODSCHartsCategoricalColorsSet} to be used to extract a specific color.
   * (example {@link ODSCHartsCategoricalColorsSet.DEFAULT_SUPPORTING_COLORS})
   */
  colorPalette: ODSCHartsCategoricalColorsSet;
  /**
   * Index of the color in the {@link ODSCHartsCategoricalColorsSet}
   */
  colorIndex: number;
}

export enum ODSCHartsSequentialColorsSet {
  SEQUENTIAL_BLUE = 'blue',
  SEQUENTIAL_GREEN = 'green',
  SEQUENTIAL_PURPLE = 'purple',
}

export enum ODSChartsLineStyle {
  BROKEN = 'broken',
  SMOOTH = 'smooth',
  BROKEN_WITH_POINTS = 'withPoints',
}

export enum ODSChartsMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ODSChartsThemeOptions {
  /**
   * The mode of the theme can be {@link ODSChartsMode.LIGHT} or  {@link ODSChartsMode.DARK}.
   *
   * Default mode is {@link ODSChartsMode.LIGHT}
   */
  mode?: ODSChartsMode;
  /**
   * categoricalColors is the set of colors to be used to graph the chart.
   *
   * It can be
   * - one of the predefined {@link ODSCHartsCategoricalColorsSet} defined in Orange Design System
   *
   * example: `ODSCharts.ODSCHartsCategoricalColorsSet.DEFAULT_SUPPORTING_COLORS`.
   *
   * - Or it can be an array of colors {@link ODSCHartsCustomCategoricalColor}
   *
   * example:
   * ```
   *      [
   *        {
   *          colorPalette:
   *            ODSCharts.ODSCHartsCategoricalColorsSet
   *              .DEFAULT_SUPPORTING_COLORS,
   *          colorIndex: 2,
   *        },
   *        {
   *          colorPalette:
   *            ODSCharts.ODSCHartsCategoricalColorsSet.SEQUENTIAL_GREEN,
   *          colorIndex: 0,
   *        },
   *      ]
   * ```
   * Default categoricalColors is {@link ODSCHartsCategoricalColorsSet.DEFAULT_SUPPORTING_COLORS}
   */
  categoricalColors?:
    | ODSCHartsCategoricalColorsSet
    | ODSCHartsCustomCategoricalColor[];
  /**
   * visualMapColor is the set of colours to be used if map graphs (like Heatmap)
   *
   * Default visualMapColor is {@link ODSCHartsSequentialColorsSet.SEQUENTIAL_BLUE}
   */
  visualMapColor?: ODSCHartsSequentialColorsSet;
  /**
   * lineStyle soecifies the style of line in lineCharts.
   *
   * It can be {@link ODSChartsLineStyle.BROKEN}, {@link ODSChartsLineStyle.SMOOTH} of {@link ODSChartsLineStyle.BROKEN_WITH_POINTS}.
   *
   * Default lineStyle is {@link ODSChartsLineStyle.SMOOTH}
   */
  lineStyle?: ODSChartsLineStyle;
  /**
   * cssTheme is the css styles to be used for designing legends and popover elements.
   *
   * - It is possible to use one of the delivered value of {@link ODSChartsCSSThemes}
   * - It is also possible to defined a cssTheme for any other framework with a {@link ODSChartsCSSThemeDefinition}
   *
   * Default cssTheme is {@link ODSChartsCSSThemes.NONE}
   */
  cssTheme?: ODSChartsCSSThemeDefinition;
}

const THEMES: {
  [mode in ODSChartsMode]: {
    common: any;
    linesAxis: any;
    categoricalColors: {
      [colorSet in ODSCHartsCategoricalColorsSet]: { color: string[] };
    };
    sequentialColors: {
      [colorSet in ODSCHartsSequentialColorsSet]: { visualMapColor: string[] };
    };
    linesStyle: { [style in ODSChartsLineStyle]: any };
  };
} = {
  light: {
    common: LIGHT_COMMON,
    linesAxis: LIGHT_LINES_AXIS,
    categoricalColors: {
      supportingColors: LIGHT_CATEGORICAL_COLORS_SUPPORTING_COLORS,
      darkerTints: LIGHT_CATEGORICAL_COLORS_DAKER_TINTS,
      lighterTints: LIGHT_CATEGORICAL_COLORS_LIGHTER_TINTS,
      blue: LIGHT_CATEGORICAL_COLORS_BLUE,
      green: LIGHT_CATEGORICAL_COLORS_GREEN,
      purple: LIGHT_CATEGORICAL_COLORS_PURPLE,
    },
    sequentialColors: {
      blue: LIGHT_SEQUENTIAL_COLORS_BLUE,
      green: LIGHT_SEQUENTIAL_COLORS_GREEN,
      purple: LIGHT_SEQUENTIAL_COLORS_PURPLE,
    },
    linesStyle: {
      broken: COMMON_LINE_STYLE_BROKEN,
      withPoints: COMMON_LINE_STYLE_POINTS,
      smooth: COMMON_LINE_STYLE_SMOOTH,
    },
  },
  dark: {
    common: DARK_COMMON,
    linesAxis: DARK_LINES_AXIS,
    categoricalColors: {
      supportingColors: DARK_CATEGORICAL_COLORS_SUPPORTING_COLORS,
      darkerTints: DARK_CATEGORICAL_COLORS_DAKER_TINTS,
      lighterTints: DARK_CATEGORICAL_COLORS_LIGHTER_TINTS,
      blue: DARK_CATEGORICAL_COLORS_BLUE,
      green: DARK_CATEGORICAL_COLORS_GREEN,
      purple: DARK_CATEGORICAL_COLORS_PURPLE,
    },
    sequentialColors: {
      blue: DARK_SEQUENTIAL_COLORS_BLUE,
      green: DARK_SEQUENTIAL_COLORS_GREEN,
      purple: DARK_SEQUENTIAL_COLORS_PURPLE,
    },
    linesStyle: {
      broken: COMMON_LINE_STYLE_BROKEN,
      withPoints: COMMON_LINE_STYLE_POINTS,
      smooth: COMMON_LINE_STYLE_SMOOTH,
    },
  },
};

/**
 * ODSChartsTheme is the object get by `ODSCharts.getThemeManager`({@link ODSChartsThemeOptions})
 *
 * This manager is used to
 * - get the ODS theme, register it, and use it
 * ```
 * // register this theme to echarts
 * echarts.registerTheme(themeManager.name , themeManager.theme);
 * // initiate the with the generated theme
 * var myChart = echarts.init(div, themeManager.name)
 * ```
 * - to build the graph options
 * ```
 * // Set the data to be displayed.
 * themeManager.setDataOptions(<dataOptions>);
 * // Register the externalization of the legend.
 * themeManager.externalizeLegends(...);
 * // Manage window size changed
 * themeManager.manageChartResize(...);
 * // Register the externalization of the tooltip/popup
 * themeManager.externalizePopover(...);
 * // Display the chart using the configured theme and data.
 * myChart.setOption(themeManager.getChartOptions());
 * ```
 */
export class ODSChartsTheme {
  private dataOptions: any;
  private chartLegendManager: ODSChartsLegends =
    undefined as unknown as ODSChartsLegends;
  private chartResizeManager: ODSChartsResize =
    undefined as unknown as ODSChartsResize;
  private chartPopoverManager: ODSChartsPopover =
    undefined as unknown as ODSChartsPopover;
  public cssThemeName: ODSChartsCSSThemesNames;

  private constructor(
    public name: string,
    public theme: any,
    public options: ODSChartsThemeOptions
  ) {
    this.cssThemeName =
      (Object.keys(ODSChartsCSSThemes).find(
        (oneTheme) =>
          ODSChartsCSSThemes[oneTheme as ODSChartsCSSThemesNames] ===
          options.cssTheme
      ) as ODSChartsCSSThemesNames) || ODSChartsCSSThemesNames.CUSTOM;
  }

  /**
   * Entry point of the library. It returns the generated theme manager.
   *
   * This manager is used to retrieve the Echarts theme and manage the chart options in accordance with the Orange Design System.
   *
   * The method takes the theme configuration as a parameter {@link ODSChartsThemeOptions}.
   * @param options: default option used to genarate the theme
   * @returns the theme manager
   */
  public static getThemeManager(
    options?: ODSChartsThemeOptions
  ): ODSChartsTheme {
    if (!options) {
      options = {};
    }
    if (!options.mode) {
      options.mode = ODSChartsMode.LIGHT;
    }
    const mode: ODSChartsMode = options.mode;
    if (!options.categoricalColors) {
      options.categoricalColors =
        ODSCHartsCategoricalColorsSet.DEFAULT_SUPPORTING_COLORS;
    }
    if (!options.visualMapColor) {
      options.visualMapColor = ODSCHartsSequentialColorsSet.SEQUENTIAL_BLUE;
    }
    if (!options.lineStyle) {
      options.lineStyle = ODSChartsLineStyle.SMOOTH;
    }
    if (!options.cssTheme) {
      options.cssTheme = ODSChartsCSSThemes.NONE;
    }
    var themeName = `ods.${getStringValue(mode)}.${getStringValue(
      options.categoricalColors
    )}.${getStringValue(options.visualMapColor)}.${getStringValue(
      options.lineStyle
    )}`;

    const theme = cloneDeepObject(ODS_PROJECT);

    mergeObjects(theme, cloneDeepObject(THEMES[mode].common));

    mergeObjects(theme, cloneDeepObject(THEMES[mode].linesAxis));

    if (typeof options.categoricalColors === 'string') {
      mergeObjects(
        theme,
        cloneDeepObject(
          THEMES[mode].categoricalColors[options.categoricalColors]
        )
      );
    } else {
      mergeObjects(
        theme,
        cloneDeepObject({
          color: options.categoricalColors.map((color) =>
            'string' === typeof color
              ? color
              : THEMES[mode].categoricalColors[color.colorPalette].color[
                  color.colorIndex
                ]
          ),
        })
      );
    }

    mergeObjects(
      theme,
      cloneDeepObject(THEMES[mode].sequentialColors[options.visualMapColor])
    );

    mergeObjects(
      theme,
      cloneDeepObject(THEMES[mode].linesStyle[options.lineStyle])
    );

    return new ODSChartsTheme(themeName, theme, options);
  }

  /**
   * setDataOptions is used to set the graph data.
   *
   * Example:
   * ```
   *     lineChartODSTheme
   *       .setDataOptions({
   *         xAxis: {
   *           data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'],
   *         },
   *         series: [
   *           {
   *             name: 'sales',
   *             type: 'bar',
   *             data: [5, 20, 36, 10, 10, 20],
   *           },
   *         ],
   *       })
   * ```
   * @param options
   * @returns returns back the theme manager object
   */
  public setDataOptions(options: any): ODSChartsTheme {
    this.dataOptions = options;
    return this;
  }

  /**
   * getThemeOptions() can be used to get the options that should be added to charts options to implement the Orange Design System.
   *
   * getThemeOptions() does not need to be called if you use getChartOptions() as getChartOptions() internally already calls it.
   *
   * getThemeOptions() needs graph data, already set or given in the dataOptions parameter
   * @returns  returns back the theme manager object
   */
  public getThemeOptions(dataOptions?: any): any {
    if (dataOptions) {
      this.dataOptions = dataOptions;
    }
    if (!this.dataOptions) {
      throw new Error(
        'the chart basic options must be set to get the theme completion'
      );
    }

    const axisLabel = {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 14,
      fontFamily: 'Helvetica Neue, sans-serif',
      color:
        ODSChartsMode.LIGHT === this.options.mode
          ? 'rgba(0, 0, 0, 1)'
          : '#FFFFFF',
    };
    const axisLine = {
      show: true,
      lineStyle: {
        width: 2,
        color:
          ODSChartsMode.LIGHT === this.options.mode ? '#CCCCCC' : '#CCCCCC',
      },
    };
    const splitLine = {
      show: true,
      lineStyle: {
        width: 1,
        color:
          ODSChartsMode.LIGHT === this.options.mode ? '#CCCCCC' : '#CCCCCC',
      },
    };
    const themeOptions: any = {
      xAxis: { axisLabel: cloneDeepObject(axisLabel) },
      yAxis: { axisLabel: cloneDeepObject(axisLabel) },
    };
    for (const axis of ['xAxis', 'yAxis']) {
      if (
        (!this.dataOptions[axis] || !this.dataOptions[axis].data) &&
        !this.dataOptions[axis].axisLine
      ) {
        themeOptions[axis].axisLine = { show: false };
        themeOptions[axis].splitLine = { show: false };
      } else {
        themeOptions[axis].axisLine = cloneDeepObject(axisLine);
        themeOptions[axis].splitLine = cloneDeepObject(splitLine);
      }
    }

    if (this.chartLegendManager) {
      this.chartLegendManager.addLegend(
        this.dataOptions,
        this.theme.color,
        this.options.cssTheme as ODSChartsCSSThemeDefinition,
        this.cssThemeName,
        this.options.mode as ODSChartsMode
      );
    }

    if (this.chartResizeManager) {
      this.chartResizeManager.addResizeManagement();
    }

    if (this.chartPopoverManager) {
      this.chartPopoverManager.addPopoverManagement(
        this.dataOptions,
        themeOptions,
        this.options.cssTheme as ODSChartsCSSThemeDefinition,
        this.cssThemeName,
        this.options.mode as ODSChartsMode
      );
    }

    return themeOptions;
  }

  /**
   * externalizeLegends() configure the manager to externalize the legends from the graphs to put it directly in your HTML document.
   *
   * The generated legends
   * - will implement the Orange Design System
   * - will be link with the graph.
   *
   * externalizeLegends() needs:
   * - echart: the initialzed eCharts object
   * - legendHolderSelector: the css selector of the legends container
   *
   * optionnaly you can use this call to set dataOptions
   * @returns returns back the theme manager object
   */
  public externalizeLegends(
    echart: any,
    legendHolderSelector: string,
    dataOptions?: any
  ): ODSChartsTheme {
    if (dataOptions) {
      this.dataOptions = dataOptions;
    }
    this.chartLegendManager = ODSChartsLegends.addLegend(
      echart,
      legendHolderSelector
    );
    return this;
  }

  /**
   * externalizePopover() configure the manager to externalize the management of popover or tooltip.
   *
   * The generated tooltips or popover will implement the Orange Design System.
   *
   * externalizePopover() needs:
   * - popoverConfig: the configuration of the externalizePopover feature {@link ODSChartsPopoverConfig}
   * - popoverDefinition: a renderer {@link ODSChartsPopoverDefinition} of the popover/tooltip
   *
   *   {@link ODSChartsPopoverManagers} gives preconfigured renderer
   *
   *   default value is  {@link ODSChartsPopoverManagers.NONE}: uses default ECharts templating to externalize tooltip/popover HTML element, implemting Orange Design system
   *
   * optionnaly you can use this call to set dataOptions
   * @returns returns back the theme manager object
   */
  public externalizePopover(
    popoverConfig: ODSChartsPopoverConfig = {},
    popoverDefinition?: ODSChartsPopoverDefinition,
    dataOptions?: any
  ): ODSChartsTheme {
    if (dataOptions) {
      this.dataOptions = dataOptions;
    }
    if (!popoverDefinition) {
      popoverDefinition = ODSChartsPopoverManagers.NONE;
    }
    this.chartPopoverManager = ODSChartsPopover.addPopoverManagement(
      popoverDefinition as ODSChartsPopoverDefinition,
      popoverConfig
    );
    return this;
  }

  /**
   * manageChartResize() ensures that the graph resizes correctly when the window is resized
   *
   * manageChartResize() needs:
   * - echart: the initialzed eCharts object
   * - chartId: an unique id to identify the chart
   *
   * optionnaly you can use this call to set dataOptions
   * @returns returns back the theme manager object
   */
  public manageChartResize(
    echart: any,
    chartId: string,
    dataOptions?: any
  ): ODSChartsTheme {
    if (dataOptions) {
      this.dataOptions = dataOptions;
    }
    this.chartResizeManager = ODSChartsResize.addResizeManagement(
      echart,
      chartId
    );
    return this;
  }

  /**
   * getChartOptions() build the eCharts options merging
   * - options implementing the Orange Design System
   * - optionally options implementing {@link externalizeLegends},
   * - optionally options implementing {@link externalizePopover},
   * - optionally options implementing {@link manageChartResize},
   * - data from {@link setDataOptions}
   *
   * optionnaly you can use this call to set dataOptions
   * @returns the Echarts options
   */
  public getChartOptions(dataOptions?: any): any {
    if (dataOptions) {
      this.dataOptions = dataOptions;
    }
    if (!this.dataOptions) {
      throw new Error(
        'the chart basic options must be set to get the theme completion'
      );
    }
    const result = mergeObjects(this.getThemeOptions(), this.dataOptions);
    return result;
  }
}
