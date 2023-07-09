import { Dictionary, groupBy, toNumber } from "lodash";
import { Messages, series_type } from "../utils/app.types";
import { CHART_OPTIONS } from "../utils/charts.defaults";
import { ChartHelper } from "./chartsHelper";
import moment from "moment";

export class EngagementHelper extends ChartHelper {
   
    /** appends series data for ploting
     * @param messages 
     * @param channels 
     * @returns
     */
    engagementMessageOverTimeChartOptions(messages:Messages, channels:{name: string, id: string}[]): CHART_OPTIONS{
        if(messages?.length && channels?.length){
            this.default_chart_options.series = this.#prepareSeries(messages, channels);
            this.default_chart_options.title = {text : 'Engagement Messages Timeline'};
            this.default_chart_options.tooltip = {
                xDateFormat: '%d %b',
                headerFormat: '<b>{series.name}</b></br>',
                pointFormat: `{point.y} message(s) on {point.x:%d %b}`,
               
                
            }
            return this.default_chart_options;
        }
        return this.default_chart_options;
    }

    /**
     * wrapper function for preparing series from raw data
     * @param messages 
     * @param channels 
     * @returns 
     */
    #prepareSeries(messages:Messages, channels:{name: string, id: string}[]): series_type {
        let series : series_type = [];
        const channel_names = this.#getChannelNameMap(channels);
        series = this.#getSeriesForMultipleMessages(messages, channel_names);
        return series;

    }

    /**
     * creates id-> name map for channels
     * @param channels 
     * @returns 
     */
    #getChannelNameMap(channels:{name: string, id: string}[]) : Map<string, string>{
        const channel_name_map : Map<string, string> = new Map<string, string>();
        if(channels){
            channels.forEach(channel => {
                channel_name_map.set(channel?.id, channel?.name);
            })
        }
        return channel_name_map;
    }

    /**
     * prepares series data for each channel and messages on different dates
     * @param messages 
     * @param channel_name_map 
     * @returns 
     */
    #getSeriesForMultipleMessages(messages: Messages, channel_name_map: Map<string, string> ) : series_type{
        const channel_message_map : Dictionary<Messages> = groupBy(messages, (item)=> item.channelId);
        const series_map : Map<string, {x: string|number , y: number}[]> = new Map<string, {x: string|number , y: number}[]>();
        Object.keys(channel_message_map).forEach( (key : string) => {
            const message = channel_message_map[key];
            if(message.length > 1){
                message.forEach(msg => {
                    const channel_name : string | undefined = channel_name_map.get(msg.channelId);
                    if(channel_name){
                        const series_data = series_map.get(channel_name);
                        if(series_data){
                            series_data.push({x: moment(msg?.timeBucket).unix() ,y: toNumber(msg.count)});
                        }else{
                            series_map.set(channel_name, [{x :moment(msg?.timeBucket).unix(), y: toNumber(msg.count)}]);
                        }
                    }
                })
            }
        })
        const series : series_type = [];
        series_map.forEach((value: {x: string | number, y: number}[], key: string) => {
            series.push({name: key, data: value});
        });
        return series;

    }

}