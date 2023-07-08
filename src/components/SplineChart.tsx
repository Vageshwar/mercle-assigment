import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { EngagementHelper } from "../services/engagementHelper";
import { CHART_TYPES, channels, messages } from "../utils/validations.constants";

function SplineChart() {
    const [chart_options, setChartOptions] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        const engagementHelper = new EngagementHelper(CHART_TYPES.SPLINE);
        const engagement_message_overtime = engagementHelper.engagementMessageOverTimeChartOptions(messages, channels);
        setChartOptions(engagement_message_overtime);
        setLoading(false);
    }, []);
    // const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)
    return(
        <>
            {
                loading
                ?
                    <p>Loading...</p>
                :
                    <HighchartsReact highcharts={Highcharts} options={chart_options} />
            }
        </>
    )
}

export default SplineChart