import { series_type } from "./app.types";

type callbackFunction = () => string;

export type CHART_OPTIONS = {
    chart: {
        type: string,
    },
    title?: {
        text?: string,
        align?: 'left' | 'right' | 'center' | 'middle',
    },
    subtitle?: {
        text?: string,
        align?: 'left' | 'right' | 'center' | 'middle',
    },
    xAxis?: {
        reversed?: boolean,
        type?: string,
        title?: {
            text?: string,
            enabled?: boolean,
        },
        categories?: string[] | null | undefined,
        dateTimeLabelFormats?: {
            day?: {
              main: string,
            }
          },
        
    },
    yAxis?: {
        reversed?: boolean,
        title?: {
            text?: string,
            enabled?: boolean,
        },
        
    },
    tooltip?: {
        headerFormat?: string,
        pointFormat?: string,
        formatter?: callbackFunction,
        xDateFormat?: string,
    },
    plotOptions: {
        spline?: {
            marker?: {
                enable: boolean,
            }
        },
        bar?: {
            enabled: boolean,
        },
        line?: {
            enabled: boolean,
        }
    },
    series?: series_type,
}

export const SPLINE_DEFAULT = {
    chart: {
        type: 'spline',
    },
    xAxis: {
        reversed: false,
        title: {
            text: 'Date',
            enabled: true,
        },
        categories: null,
        type: 'datetime',
        dateTimeLabelFormats: {
            day: {
              main: '%d. %b'
            }
          },
        
    },
    yAxis: {
        reversed: false,
        title: {
            text: 'Messages',
            enabled: true,
        },
        
    },
    plotOptions: {
        spline: {
            marker: {
                enable: true,
            }
        },
    },
    series: [],
}

export type CHART_TYPES = 'spline' | 'line' | 'bar';

export const CHART_TYPES = {
    SPLINE: 'spline',
    LINE: 'line',
}

export const DEFAULT_OPTIONS = {
    [CHART_TYPES.SPLINE]: SPLINE_DEFAULT,
}