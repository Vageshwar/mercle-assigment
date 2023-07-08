import { CHART_OPTIONS, DEFAULT_OPTIONS } from "../utils/charts.defaults";

export class ChartHelper {
    default_chart_options: CHART_OPTIONS;
    constructor(chart_type: string){
        this.default_chart_options = DEFAULT_OPTIONS[chart_type];
    }
}